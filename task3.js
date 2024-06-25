// script.js
const uploadForm = document.getElementById('upload-form');
const uploadBtn = document.getElementById('upload-btn');
const uploadStatus = document.getElementById('upload-status');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('file').files[0];
    const password = document.getElementById('password').value;
    const expiry = document.getElementById('expiry').value;
    uploadFile(file, password, expiry);
});

function uploadFile(file, password, expiry) {
    // Upload file to Firebase Storage
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(files/${file.name}).put(file);
    uploadTask.on('state_changed', (snapshot) => {
        // Handle upload progress
    }, (error) => {
        console.error(error);
        uploadStatus.innerHTML = 'Upload Failed';
    }, () => {
        // Handle successful upload
        const downloadURL = uploadTask.snapshot.ref.getDownloadURL();
        saveMessage(downloadURL, password, expiry);
    });
}

function saveMessage(downloadURL, password, expiry) {
    // Save metadata to Firebase Realtime Database
    const dbRef = firebase.database().ref('files');
    const uniqueId = createUniqueId();
    dbRef.child(uniqueId).set({
        url: downloadURL,
        password: password,
        expiry: expiry
    });
    uploadStatus.innerHTML = Upload Successful! Unique ID: ${uniqueId};
}

function createUniqueId() {
    // Generate a unique 5-digit number
    return Math.floor(10000 + Math.random() * 90000);
}

// Function to download file
function downloadFile(uniqueId) {
    const dbRef = firebase.database().ref('files');
    dbRef.child(uniqueId).once('value', (snapshot) => {
        const fileData = snapshot.val();
        if (fileData) {
            const password = prompt('Enter password:');
            if (password === fileData.password) {
                window.open(fileData.url, '_blank');
                // Delete file from database and storage after 15 seconds
                setTimeout(() => {
                    dbRef.child(uniqueId).remove();
                    const storageRef = firebase.storage().refFromURL(fileData.url);
                    storageRef.delete();
                }, 15000);
            } else {
                alert('Invalid password');
            }
        } else {
            alert('File not found');
        }
    });
}
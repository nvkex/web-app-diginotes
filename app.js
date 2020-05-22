//Rest of the code
const newNoteBtn = document.querySelector('.new-note');
const newNoteDlg = document.querySelector('.note-dialog');
const cancelNewNoteBtn = document.querySelector('#cancelNote');
const hideNoteBtn = document.querySelector('#hideNote');
const noteDisplay = document.querySelector('.note-display');
const noteDisplayBox = document.querySelector('.note-display-box');
const noteList = document.querySelector('.note-list');

// web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAQhVkwaGQhXh42YsLTO0hUgIOPK5L7RSk",
    authDomain: "diginotes-26ff9.firebaseapp.com",
    databaseURL: "https://diginotes-26ff9.firebaseio.com",
    projectId: "diginotes-26ff9",
    storageBucket: "diginotes-26ff9.appspot.com",
    messagingSenderId: "674084131396",
    appId: "1:674084131396:web:4ebcb7dc47be6e8bb62211",
    measurementId: "G-3SHT2BSX58"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

const layNotes = (note) => {
    let template = `
        <div class="col-sm-3 my-2">
            <div class="note bg-info text-light text-left">
                <h5 class="note-heading">${note.title}</h5>
                <hr class="bg-light">
                <p class="note-content">${note.content}</p>
            </div>
        </div>
    `;
    noteList.innerHTML += template;
}

db.collection('notes').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        layNotes(doc.data());
    });
}).catch((err) => {
    console.log(err);
});

$(document).ready(function () {
    $(newNoteDlg).hide();
    $(noteDisplay).hide();
    $(document.body).on('click', '.fa-plus', (e) => {
        $(newNoteDlg).fadeIn("slow");
    });

    $(cancelNewNoteBtn).on('click', () => {
        $(newNoteDlg).fadeOut("slow");
    });

    $(hideNoteBtn).on('click', () => {
        $(noteDisplay).fadeOut("slow");
    });

    $(document.body).on('click', '.note, .note-heading, .note-content', (e) => {
        let head = '';
        let content = '';
        if (e.target.classList.contains('note-heading') || e.target.classList.contains('note-content')) {
            head = e.target.parentElement.children[0].innerHTML;
            content = e.target.parentElement.children[2].innerHTML;
        }
        else{
            head = e.target.children[0].innerHTML;
            content = e.target.children[2].innerHTML;
        }
        noteDisplayBox.children[0].innerHTML = head;
        noteDisplayBox.children[2].innerHTML = content;
        $(noteDisplay).fadeIn("slow");
    });
});


// newNoteBtn.addEventListener('click', () => {
//     newNoteDlg.classList.remove('d-none');
// });


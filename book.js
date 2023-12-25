$(document).ready(function ()
{
    getBook();
    
})

var isEdit = false;

function SaveBook() {
    var url = "https://localhost:44347/api/Values/";
    var Id = $('#id').val();
    console.log(Id);
    if (!isEdit) {
        var objBook = {};
        objBook.id = $('#id').val();
        objBook.title = $('#title').val();
        objBook.author = $('#author').val();
        objBook.isbn = $('#isbn').val();
        objBook.genre = $('#genre').val();
        objBook.publihedYear = $('#publishedYear').val();
        console.log("Added");
        if (objBook) {
            $.ajax({
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(objBook),
                type: "Post",
                success: function (result) {
                    clear();
                    getBook();
                    alert(result);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }
    else {
        updateBook();
    }
}

function clear() {
    $('#id').val('');
    $('#title').val('');
    $('#author').val('');
    $('#isbn').val('');
    $('#genre').val('');
    $('#publishedYear').val('');
    isEdit = false;
}

function getBook() {
    var url = "https://localhost:44347/api/Values/";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            //alert(JSON.stringify(result));
            if (result) {
                var row = '';
                $('#book').empty(row);
                for (let i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + result[i].ID + "</td>"
                        + "<td>" + result[i].Title + "</td>"
                        + "<td>" + result[i].Author + "</td>"
                        + "<td>" + result[i].Isbn + "</td>"
                        + "<td>" + result[i].Genre + "</td>"
                        + "<td>" + result[i].PublihedYear + "</td>"
                        + "<td> <button class='btn btn-primary' onclick='editBook(" + result[i].ID+")' > Edit</button ></td > "
                        + "<td> <button class='btn btn-primary' onclick='deleteBook(" + result[i].ID+")'>Delete</button></td>"
                        + "</tr>";
                }
                if (row != '') {
                    $('#book').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function deleteBook(ID) {
    var url = "https://localhost:44347/api/Values/"+ID;
   
 
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "Delete",
            success: function (result) {
                clear();
                getBook();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    
}

function editBook(ID) {
    var url = "https://localhost:44347/api/Values/" + ID;

    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            isEdit = true;
            if (result) {
                $('#id').val(result.ID);
                $('#title').val(result.Title);
                $('#author').val(result.Author);
                $('#isbn').val(result.Isbn);
                $('#genre').val(result.Genre);
                $('#publishedYear').val(result.PublihedYear);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
function updateBook() {
    var id = $('#id').val();
    var updatedBook = {
        id: id,
        title: $('#title').val(),
        author: $('#author').val(),
        isbn: $('#isbn').val(),
        genre: $('#genre').val(),
        publihedYear: $('#publishedYear').val()
    };

    $.ajax({
        url: "https://localhost:44347/api/Values/" + id,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedBook),
        success: function (result) {
            clear();
            alert("Book updated: " + result);
            getBook();
        },
        error: function (msg) {
            alert("Error updating book: " + msg);
        }
    });
}

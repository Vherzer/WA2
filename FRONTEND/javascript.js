"use strict";

// a little console log to make sure the js file is working correctly
console.log("script loaded");

// Function to add a new book
$('#addbookbutton').click(function() {
  var booktitle = $('#booktitle').val();
  var bookisbn = $('#bookisbn').val();
  var bookauthor = $('#author').val();
  var re = /\w+/
  if (re.test(booktitle)) {
    $.ajax({
      url: "http://localhost:3000/books",
      method: "POST",
      data: {title: booktitle, isbn: bookisbn},
      success: function(res) {
        console.log(res)
      }
    })
    .then( res => {
      $.ajax({
        url: "http://localhost:3000/authors",
        method: "POST",
        data: {name: bookauthor},
        success: function(res) {
          console.log(res)
        }
      })
    })
     .then( res => {
       $.ajax({
         url: "http://localhost:3000/authors/" +bookauthor,
         method: "GET",
         data: {id: bookauthor},
         success: function(res) {
           console.log(res)
           $(res).each(function(data, i) {
           console.log(res)
           var authorId = i.id;
         })
       }})
     })
    // .then( res => {
    //   $.ajax({
    //     url: "http://localhost:3000/books",
    //     method: "GET",
    //     data: {title: booktitle},
    //     success: function(res) {
    //       res.forEach(function(data) {
    //       console.log(res)
    //       var bookId = data.id
    //     })
    //   }})
    // })
    // .then( res => {
    //   $.ajax({
    //     url:"http://localhost:3000" + "/books" + bookId + "/authors" + authorID,
    //     method: "POST",
    //     data:{}
    //   })
    // })


  }
});
// Function to search for a book
$('#searchbookbutton').click(function() {
  var bookSearch = $('#searchtitle').val();
  $.ajax({
    url: "http://localhost:3000/search"+ "?type=book&title="+bookSearch,
    method: "GET",
    //data: {title: bookSearch},
    success: function(res) {
      console.log(res);
      $(res).each(function(data, i) {
        var bookId = i.id;
        var title = i.title;
        var isbn = i.isbn;
        console.log(i);
        $('.bookresults').append(
          '<ul class="isbn' + i + '">' +"ISBN:"+ isbn + '</ul>',
          '<ul class="book-' + i + '">' +"Title:"+ title + '</ul><button class="del-' + i + '">Delete</button>'
          )
        // Function to delete a book
        $('[class^=del-]').click(function() {
          $.ajax({
            url:"http://localhost:3000/books/" +bookId,
            method: "DELETE",
            success: function(res){
              console.log(res);
            }
          })
      })
  })
}//)
});
});
//})
// $.get("http://localhost:3000/books", {title: bookSearch},, function() {
//
// })
//
// $.post(url, data, function(){
//
// })
// Function to add a new user
$('#adduserbutton').click(function() {
  var username = $('#username').val();
  var userbarcode = $('#userbarcode').val();
  var usertype = $('#usertype').val();
  var je = /\w+/
  if (je.test(username)) {
    $.ajax({
      url: "http://localhost:3000/users",
      method: "POST",
      data: {name: username, barcode: userbarcode, memberType: usertype},
      success: function(res) {
        console.log(res)
      }
    })
    .then( res => {

    }

    )
  }
});
;

// Function to search for a user with name
$('#searchuserbutton').click(function() {
  console.log("clicked");
  var usernameSearch = $('#searchname').val();
  var usercodeSearch = $('#searchbarcode').val();
  $.ajax({
    url: "http://localhost:3000/search"+ "?type=user&name="+usernameSearch,
    method: "GET",
    //data: {name: usernameSearch, barcode: usercodeSearch},
    success: function(res) {
      console.log(res);
      $(res).each(function(data, i) {
        var username = i.name;
        var barcode = i.barcode;
        var userid = i.id;
        var membertype = i.memberType;
        console.log(i);
        $('.userresults').append(
          '<ul class="barcode' + i + '">' +"Barcode: "+ barcode + '</ul>',
          '<ul class="membertype' + i + '">' +"Membertype: "+ membertype + '</ul>',
          '<ul class="name-' + i + '">' +"User Name: "+ username + '</ul><button class="del-' + i + '">Delete</button><button class="change-' + i + '">Update</button>'
        )
        // Function to remove a user
        $('[class^=del-]').click(function() {
          $.ajax({
            url:"http://localhost:3000/users/" +userid,
            method: "DELETE",
            success: function(res){
              console.log(res);
            }
          })
      })
      // Function to update user name or membertype
      //$('[class^=change-]').click(function(){
        //$.ajax({
          //url:"http://localhost:3000/users",
          //method:"PUT",
          //data:
        //})
      //})
  })
}
})

});
// Function to search for a user with Barcode
$('#searchusercodebutton').click(function() {
  console.log("clicked");
  var usernameSearch = $('#searchname').val();
  var usercodeSearch = $('#searchbarcode').val();
  $.ajax({
    url: "http://localhost:3000/search"+ "?type=user&barcode="+usercodeSearch,
    method: "GET",
    //data: {name: usernameSearch, barcode: usercodeSearch},
    success: function(res) {
      console.log(res);
      $(res).each(function(data, i) {
        var username = i.name;
        var barcode = i.barcode;
        var userid = i.id;
        var membertype = i.memberType;
        console.log(i);
        $('.userresults').append(
          '<ul class="barcode' + i + '">' +"Barcode: "+ barcode + '</ul>',
          '<ul class="membertype' + i + '">' +"Membertype: "+ membertype + '</ul>',
          '<ul class="name-' + i + '">' +"User Name: "+ username + '</ul><button class="del-' + i + '">Delete</button><button class="change-' + i + '">Update</button>'
        )
        // Function to remove a user
        $('[class^=del-]').click(function() {
          $.ajax({
            url:"http://localhost:3000/users/" +userid,
            method: "DELETE",
            success: function(res){
              console.log(res);
            }
          })
        })
        // Function to update user name or membertype
        $('[class^=change-]').click(function(){
          $.ajax({
            url:"http://localhost:3000/users",
            method:"PUT",
            //data:
            success: function(res){
              console.log(res);
            }
          })
      })
  })
}
})

});

// Function to loan book to a user
$('#loanbookbutton').click(function() {
  var booktitle = $('#booktoloan').val();
  var user = $('#loanuser').val();
  var re = /\w+/
  if (re.test(booktoloan)) {
    $.ajax({
      url: "http://localhost:3000/users/"+user,
      method: "GET",
      data: {name: user},
      success: function(res) {
        console.log(res)
        $(res).each(function(data, i) {
        console.log(res)
        var userID = i.id;
      })
      }
    })
    .then( res => {
      $.ajax({
        url: "http://localhost:3000/books/" +booktitle,
        method: "GET",
      //  data: {title: booktitle},
        success: function(res) {
          console.log(res)
          $(res).each(function(data, i) {
          console.log(res)
          var bookID = i.id;
        })
      }})
    })
    .then( res => {
      $.ajax({
        url: "http://localhost:3000/users"+ userID +"/loans"+bookID,
        method: "POST",
        data: {id: bookauthor},
        success: function(res) {
          console.log(res)
          $(res).each(function(data, i) {
          console.log(res)
          var authorId = i.id;
            $('.bookloaned').append(
            //  '<p class="barcode' + i + '">' +"Barcode: "+ barcode + '</p>'
              '<p class="bookisloaned">' + "User: "+ user + "has loaned: " + booktitle +'</p>'
            //  '<p>' +"Due Date: One month from today"'</p>'
            )
        })
      }})
    });
};
});

// Function to get due date???
// Function to search user and get list of their loans
// Function to search a book and get the loan details
$('#findloans').click(function() {
  console.log("clicked");
  var bookonloan = $('#loanedbook').val();
  $.ajax({
    url: "http://localhost:3000/search"+ "?type=user&barcode="+usercodeSearch,
    method: "GET",
    //data: {name: usernameSearch, barcode: usercodeSearch},
    success: function(res) {
      console.log(res);
      $(res).each(function(data, i) {
        var username = i.name;
        var barcode = i.barcode;
        var userid = i.id;
        var membertype = i.memberType;
        console.log(i);
        $('.userresults').append(
          '<ul class="barcode' + i + '">' +"Barcode: "+ barcode + '</ul>',
          '<ul class="membertype' + i + '">' +"Membertype: "+ membertype + '</ul>',
          '<ul class="name-' + i + '">' +"User Name: "+ username + '</ul><button class="del-' + i + '">Delete</button><button class="change-' + i + '">Update</button>'
        )
        // Function to remove a user
        $('[class^=del-]').click(function() {
          $.ajax({
            url:"http://localhost:3000/users/" +userid,
            method: "DELETE",
            success: function(res){
              console.log(res);
            }
          })
        })
        // Function to update user name or membertype
        $('[class^=change-]').click(function(){
          $.ajax({
            url:"http://localhost:3000/users",
            method:"PUT",
            //data:
            success: function(res){
              console.log(res);
            }
          })
      })
  })
}
})

});

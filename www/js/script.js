$(document).on('pageinit', '#home', function(){      
    var url = 'http://it-ebooks-api.info/v1/',
        mode = 'search/',
        bookName = encodeURI('phonegap');        
     
    $.ajax({
        url: url + mode  + bookName ,
        dataType: "json",
        async: true,
        success: function (result) {
           ajax.parseJSON(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });         
});


 
$(document).on('pagebeforeshow', '#headline', function(){      
    $('#book-data').empty();
    $.each(bookInfo.result, function(i, row) {
        if(row.ID == bookInfo.ID) {
            $('#book-data').append('<li><img src="'+row.Image+'"></li>');
            $('#book-data').append('<li>Title: '+row.Title+'</li>');
            $('#book-data').append('<li>Subtitle: '+row.SubTitle+'</li>');
            $('#book-description').html('<p>'+row.Description+'</p>');            
            $('#book-data').listview('refresh'); 
        }
    });    
});
 
$(document).on('vclick', '#books-list li a', function(){  
    bookInfo.ID = $(this).attr('data-id');
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });
});
 
var bookInfo = {
    id : null,
    result : null
}
 
var ajax = {  
    parseJSON:function(result){  
        bookInfo.result = result.Books;
        $.each(result.Books, function(i, row) {
            $('#books-list').append('<li><a href="" data-id="' + row.ID + '"><img src="'+row.Image+'"/><h3>' + row.Title + '</h3><p>' + row.SubTitle + '</p></a></li>');
        });
        $('#books-list').listview('refresh');
    }
}   
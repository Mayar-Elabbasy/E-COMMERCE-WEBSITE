$(function () {
    let url='https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us';
    $("#submit").click(function () {
        let name=$("#name").val();
        let email=$("#email").val();
        let subject=$("#subject").val();
        let message=$("#message").val();

        console.log("name"+name+"email"+email+"subject"+subject+"message"+message);
        // console.log(email.trim().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/));
        
        if(name.trim() == ''){
            $("#VaildMessage").removeClass().empty();
            $('#VaildMessage').addClass("alert alert-danger").append("<strong>name*</strong>  From 3 to 50 charachters.");
        }
        else if(subject.trim() == ''){
            $("#VaildMessage").removeClass().empty();
            $('#VaildMessage').addClass("alert alert-danger").append("<strong>subject*</strong>");
        }
        else if(email.trim().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) == null) {
            $("#VaildMessage").removeClass().empty();
            $('#VaildMessage').addClass("alert alert-danger").append("<strong>email*</strong>");
        }
        else if(message.trim() == ''){
            $("#VaildMessage").removeClass().empty();
            $('#VaildMessage').addClass("alert alert-danger").append("<strong>message*</strong>");
        }
        else{
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify( { "name":name, "email": email,"subject":subject,"message":message } ),
            processData: false,
            success: function( data, textStatus, jQxhr ){
                $("#VaildMessage").removeClass().empty();
                $('#VaildMessage').addClass("alert alert-success").append("<strong>"+data['message']+"</strong>");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                $("#VaildMessage").removeClass().empty();
                $('#VaildMessage').addClass("alert alert-danger").append("<strong>"+textStatus+"</strong>");
            }
        });
    }
    });

});



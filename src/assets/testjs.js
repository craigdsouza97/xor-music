
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);

            element.style.display = 'none';
        }
        try{
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        }
        catch(error)
        {}
        op -= op * 0.1;
    }, 50);
}

    setTimeout(function(){

            //  if(typeof(Storage) !== "undefined") {

            //   console.log("Already shown" +sessionStorage.getItem('spalashShown'));

            //    if( !sessionStorage.getItem('spalashShown') || sessionStorage.getItem('spalashShown') === null ) {

            //    document.getElementById('splash').style.display = 'inline';

                //Display splash


                setTimeout(function(){

                 fade(document.getElementById('splash'));
                 fade(document.getElementById('pos'));

                  // document.getElementById('splash') .style.display = 'none'
                   // window.location = "http://hiteshsahu.com";

                 sessionStorage.setItem('spalashShown', true  );
              }
               , 3000);
              }, 0);

                  // } else {

                  //    //Display Main Content
                  //     document.getElementById('splash') .style.display = 'none'
                  //     document.getElementById('pos') .style.display = 'none'
                  //       console.log("Already shown");
                  //    }
                  // }

                // else {
                //         document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
                //       }
                //          }, 0);


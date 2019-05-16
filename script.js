var dropdownFrom = document.getElementById('countryCurrencyFrom');
dropdownFrom.length = 0;
var defValueFrom = document.createElement('option');
defValueFrom.text = 'Choose currency to convert From';
dropdownFrom.append(defValueFrom);
dropdownFrom.selectedIndex = 0;

var dropdownTo = document.getElementById('countryCurrencyTo');
dropdownTo.length = 0;
var defValueTo = document.createElement('option');
defValueTo.text = 'Choose currency to convert to';
dropdownTo.append(defValueTo);
dropdownTo.selectedIndex = 0;

const url = 'https://openexchangerates.org/api/currencies.json';

option1 = '';
option2 = '';

fetch(url)
    .then(function(response) {
        if (response.status !== 200) {
            alert(
                'Alaye this thing no connect jare na the status code be this ' +
                    response.status
            );
            throw 'Canot fetch currencies';
        }

        return response.json();
    })
    .then(function(data) {
        Object.keys(data).map(function(key) {
            option1 = document.createElement('option');
            option1.text = data[key];
            option1.value = key;
            dropdownFrom.append(option1);

            option2 = document.createElement('option');
            option2.text = data[key];
            option2.value = key;
            dropdownTo.append(option2);
        });

        // return;
    })
    .catch(function(err) {
        alert('fatal error -' + err);
    });

var conv = document.getElementById('converter');
conv.addEventListener(
    'click',
    function(e) {
        var amount = $('#amount').val();
        var from = $('#countryCurrencyFrom').val();
        var to = $('#countryCurrencyTo').val();
        /*     rate = 3.5;
    res = amount * rate; */

        var ffro = $('#countryCurrencyFrom :selected').text();
        var fto = $('#countryCurrencyTo :selected').text();

        var result = document.getElementById('result');

        if (!amount || !from || !to) {
            alert('All field are compulsory');
            return;
        }

        result.innerHTML = '<br />Converting....';

        var endpoint =
            'https://free.currencyconverterapi.com/api/v6/convert?q=' +
            from +
            '_' +
            to +
            '&compact=y&apiKey=sample-api-key';

        fetch(endpoint)
            .then(function(resp) {
                // if(response.code !== 200){
                //     alert("Something shitty happened");
                //     return;
                // }

                return resp.json();
            })
            .then(function(data) {
                result.innerHTML =
                    '<br /><b>' +
                    ffro +
                    ' to ' +
                    fto +
                    ' as at today is : ' +
                    parseFloat(data[from + '_' + to].val * amount).toFixed(2);
            })
            .catch(function(e) {
                alert('Error: ' + e);
            });

        // document.getElementById("result").innerHTML = "<b>" + ffro + " to " + fto + " as at today is : " + parseFloat(res).toFixed(2) + "<b>";

        /*     $.ajax({
         type: "GET",
           url: "http://free.currencyconverterapi.com/api/v5/convert?q=" + from + "_" + to +"&compact=y",
        success: function(data) {
            var exchangeRate = JSON.stringify(data).replace(/[^0-9\.]/g,'');
    
            var res= amount*exchangeRate; */
        /*  $('#res').val(parseFloat(result).toFixed(2)); */
        /*             var result = parseFloat(res).toFixed(2);
               $('#result').innerHTML = result;
              /* alert(result); */
        /*        return;
            }
        }); */
    },
    false
);

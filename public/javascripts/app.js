

  //var res = dpd.reservations;
  var resId = window.location.search.replace('?', '');
  dpd.reservations.get({id:resId}, function (res, err) {
    document.getElementById('cage').innerHTML = ('<b>' + res.cage.id + '</b> ' + ' - ' + res.cage.start + ' - ' + res.cage.end);
    document.getElementById('field').innerHTML = ('<b>' + res.field.id + '</b>' + ' - ' + res.field.start + ' - ' + res.field.end);
    document.getElementById('term').textContent = res.term;
    document.getElementById('teamName').textContent = res.teamName.name + ' - ' + res.teamName.ageGroup;
    document.getElementById('practice').textContent = res.practice.day[0] + '/' + res.practice.day[1] + ' ' + res.practice.timeBlock;
  });

     var monthtext=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        function populatedropdown(monthfield, yearfield){

    var today = new Date();
    var monthfield = document.getElementById('expMonth');
    var yearfield = document.getElementById('expYear');

        for(var m = 0; m < 12; m++)
        monthfield.options[m] = new Option(monthtext[m], monthtext[m])
        monthfield.options[today.getMonth()] = new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true);

    var thisyear = today.getFullYear();
        for(var y=0; y<20; y++){
        yearfield.options[y]=new Option(thisyear, thisyear)
        thisyear+=1
        };
        yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true);
        };

        window.onload = function(){
        populatedropdown("expMonth", "expYear")
        };




    var payment = document.getElementById('payment');

    var membership = document.getElementById('membership');

    var merch = document.getElementById('merch');

    var updatedTotal = document.getElementById('total');

    var amount;

    function calcTotal(){
        var total = (parseFloat(membership[membership.selectedIndex].value) + parseFloat(merch[merch.selectedIndex].value)).toFixed(2)
            updatedTotal.textContent = amount = total  + '';
    };

    calcTotal();

    merch.addEventListener('change', calcTotal);
    membership.addEventListener('change', calcTotal);


   $('form').submit(function() {

       var obj = {};
       obj.amount = parseFloat(amount);


       var now = new Date();
       var nowMonth = now.getMonth();


       var error = '';

       $(this).serializeArray().forEach(function(field){

         var hasInput = ('string' === typeof field.value) ? $.trim(field.value).length : field.value;

         if (!hasInput && field.name !== 'guardian'){ error = error + 'Missing '+ field.name + '\n'; }

         obj[field.name] = field.value;

       });

       if (error.length) { alert('Please Fix the following errors\n\n' + error); return 0; }
        obj.tosAccept = (obj.tosAccept === 'on');


        dpd.users.post(obj, function(result, err) {
            if(err) return console.log(err);
            console.log(result, result.id);



             window.location='success.html';
    });


    return false;

   });
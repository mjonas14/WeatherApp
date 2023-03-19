$(document).ready(function () {

    var $submitBtn = $('#submit-btn');
    var $locationField = $('#inputLocation');
    var locationList = [];

    $submitBtn.on('click', function (event) {
        event.preventDefault();

        var location = $locationField.val();
        locationList.push(location);

        let string = JSON.stringify(locationList);
        localStorage.setItem('List', string);

        var $cityEl = document.getElementById('cards');
        var $div1 = document.createElement('div');
        var $div2 = document.createElement('div');

        $div1.classList = 'card mt-2 bg-secondary text-black';
        $div2.classList = 'card-body';

        $cityEl.appendChild($div1);
        $div1.appendChild($div2);

        $div2.textContent = $locationField.val();


    });


});
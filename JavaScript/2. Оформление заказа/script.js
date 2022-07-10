ymaps.ready(init);
let myPlacemark = 0;

function init() {
    
        let myMap = new ymaps.Map('formMap', {
            center: [54.17418817620383,37.5936253703613],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            
            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }
    
}

var form = document.querySelector('.form');


function validate(){
    var Name=document.forms['form']['name'].value;
    var Phone=document.forms['form']['phone'].value;
    var Email=document.forms['form']['email'].value;
   
    if (Name.length==0){
       document.getElementById('namef').innerHTML='Не заполнено поле ФИО';
       return false;
    }
    
    if (Phone.length==0){
       document.getElementById('phonef').innerHTML='Не заполнено поле Телефон';
       return false;
    }

    
    at=Email.indexOf("@");
    dot=Email.indexOf(".");
  
    if (at<1 || dot <1){
       document.getElementById('emailf').innerHTML='Email введен не верно';
       return false;
    }

    if (myPlacemark==0){
        document.getElementById('mapf').innerHTML='Не выбрана координата';
        return false;
    }
    
    document.getElementById('ok').innerHTML='Заказ оформлен';
     
}

form.addEventListener('submit', e => {e.preventDefault(); validate()})


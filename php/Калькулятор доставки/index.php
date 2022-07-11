<?php
    const CACHE_PATH = __DIR__ . '/cache.json';
    $time = time();

    if (!file_exists(CACHE_PATH) || (filectime(CACHE_PATH) - $time + $time % 86400) < 0) {                // Если файл кэша (произвольный формат, например текстовый) отсутствует - сделать запрос к сервису и сохранить результат в файл.
        $jsonCities = file_get_contents('http://exercise.develop.maximaster.ru/service/city/');           // Если файл есть, но дата изменения - не сегодняшняя, то повторно запросить список городов из сервиса и сохранить в файл.
        $buffer     = fopen(CACHE_PATH, 'w');
        fputs($buffer, $jsonCities);
        $cities = json_decode($jsonCities);
    } else $cities = json_decode(file_get_contents(CACHE_PATH)); // Если файл кэша присутствует и последняя дата его изменения была сегодня - то получать список городов из файла.

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>PHP3</title>
    <style>
        .OK {
            color: green;
        }

        .error {
            color: red;
        }
    </style>
</head>
<body>
<div class="container">
    <form class="deliveryCalc" method="get" action="handler.php">
        <select class="citySelect" name="city">
            <?php foreach ($cities as $city) { ?>
                <option value="<?= $city ?>"><?= $city ?></option>
            <?php } ?>
        </select>
        <input class="weightInput" type="number" name="weight" placeholder="Вес, кг"/>
        <button class="submitBtn" type="submit">Расчитать</button>
    </form>
    <p class="result"></p>
</div>
<script src="script.js"></script>
</body>
</html>
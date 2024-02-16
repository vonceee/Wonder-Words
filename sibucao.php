<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="style.css">
</head>
<body>

<?php
$a = 1;
$b = 2;
function Sum1()
{
    global $a, $b;
    
    $b = $a + $b;
}
function Sum()
{
    $GLOBALS['b'] = $GLOBALS['a'] + $GLOBALS['b'];
}

Sum();
echo $b;
?>

    
</body>
</html>
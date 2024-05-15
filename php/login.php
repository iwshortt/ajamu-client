<?php

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $mysqli = require __DIR__ . "/database.php";

    $sql = sprintf("SELECT * FROM user
                    WHERE email = '%s'",
                   $mysqli->real_escape_string($_POST["email"]));

    $result = $mysqli->query($sql);

    $user = $result->fetch_assoc();

    if ($user) {

        if (password_verify($_POST["password"], $user["password_hash"])) {

            session_start();

            session_regenerate_id();

            $_SESSION["user_id"] = $user["id"];

            if ($user["email"] === "test@example.com") {
                header("Location: ../client-pages/example.html");
                exit;
            } elseif ($user["email"] === "test2@example.com") {
                header("Location: ../example2.html");
                exit;
            } elseif ($user["email"] === "test3@example.com") {
                header("Location: ../example3.html");
                exit;
            } elseif ($user["email"] === "test4@example.com") {
                header("Location: ../example4.html");
                exit;
            } else {
                header("Location: ../example.html");
                exit;
            }
        }
    }

    $is_invalid = true;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/example.css">
    <title>Login</title>
</head>
<body>
    <div class="wrapper login-wrapper">

        <form class="client-login-form" method="post">
            <fieldset class="client-login-form-cont">
                <legend class="client-login-form-legend">Log In</legend>

                <?php if ($is_invalid): ?>
                    <em>Invalid login</em>
                <?php endif; ?>

                <div class="client-login-form-input-cont">
                    <label class="client-login-form-label" for="email">email</label>
                    <input class="client-login-form-input" type="email" name="email" id="email"
                        value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">
                </div>

                <div class="client-login-form-input-cont">
                    <label class="client-login-form-label" for="password">Password</label>
                    <input class="client-login-form-input" type="password" name="password" id="password">
                </div>

                <button class="client-login-form-btn">Login</button>
            </fieldset>
        </form>

    </div>
</body>
</html>
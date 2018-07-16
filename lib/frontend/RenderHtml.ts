import { getTypeStyle } from "./styles/TypeStyle";

export const renderHtml = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Decent</title>
        <style>${getTypeStyle()}</style>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/2.12.3/antd.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
    </head>
    <body>
        <div id="root" style="height: 100%"></div>
        <script type="text/javascript" src="/app.js"></script>
    </body>
</html>`;

<meta charset="utf-8" />
<meta name="content-language" content="de"/>
<meta name="author" content="Dennis Adamczyk" />
<meta name="copyright" content="© Dennis Adamczyk 2017" />
<meta name="language" content="Deutsch" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="theme-color" content="#2196F3">

<meta name="apple-mobile-web-app-status-bar-style" content="#2196F3">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="FHG9A">
<link rel="apple-touch-startup-image" href="/img/logo_white.png">
<meta name="apple-mobile-web-app-title" content="FHG9A">
<meta name="msapplication-starturl" content="/?webapp" />

<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/img/logo_white.png" >
<link rel="icon" type="image/png" href="/img/logo.png" sizes="any">

<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<link rel="stylesheet" href="/css/waves.min.css" />

<link rel="stylesheet" href="/css/layout.css" />
<link rel="stylesheet" href="/css/style.css" />

<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="/js/layout.js"></script>
<script src="/js/waves.min.js"></script>
<script src="/js/ripple.js"></script>
<script src="/js/mobile-detect.js"></script>
<script src="/js/intro.js"></script>
<script src="js/page.js"></script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=XX-xxxxxxxxx-x"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'XX-xxxxxxxxx-x');
</script>

<!-- ONE SIGNAL: PUSH -->
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      safari_web_id: "web.onesignal.auto.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      autoRegister: true,
      promptOptions: {
        /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
        /* actionMessage limited to 90 characters */
        actionMessage: "Benachrichtigungen bekommen, um immer die neusten Infos deiner Klasse zu erhalten?",
        /* acceptButtonText limited to 15 characters */
        acceptButtonText: "ERLAUBEN",
        /* cancelButtonText limited to 15 characters */
        cancelButtonText: "NEIN, DANKE"
      },
      notifyButton: {
        enable: false,
      },
      welcomeNotification: {
        disable: true
      }
    });
  });
</script>

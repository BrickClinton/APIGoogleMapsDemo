
// CONFIGURACIONES DEL ADMIN
// Modo oscuro
$("#checkbox-theme").change(function (){
    if ($(this).is(':checked')) {
        applyThemeDark()
        localStorage.setItem("theme", "dark-mode")
    } else {
        applyThemeLight()
        localStorage.setItem("theme", "light-mode")
    }
})

function applyThemeDark(){
    addClassDarkHeaderMain()
    $('body').addClass('dark-mode')
    $("#checkbox-theme").attr("checked", true);
}

function applyThemeLight(){
    removeClassDarkHeaderMain()
    $('body').removeClass('dark-mode')
    $("#checkbox-theme").attr("checked", false);
}

function addClassDarkHeaderMain(){
    $('.main-header').removeClass('navbar-white').removeClass('navbar-light')
    $('.main-header').addClass('navbar-dark')
}

function removeClassDarkHeaderMain(){
    $('.main-header').removeClass('navbar-dark')
    $('.main-header').addClass('navbar-light').addClass('navbar-white')
}


// OPCIONES DE LA BARRA LATERAL
$('#cbox-sidebar-mini').click(function (){
    if ($(this).is(':checked')) {
        applyValueSidebarMini()
        localStorage.setItem("minSidebar", "true")
    } else {
        removeValueSidebarMini()
        localStorage.setItem("minSidebar", "false")
    }
})

function applyValueSidebarMini(){
    $('body').addClass('sidebar-mini')
    $("#cbox-sidebar-mini").attr("checked", true);
}

function removeValueSidebarMini(){
    $('body').removeClass('sidebar-mini')
    $("#cbox-sidebar-mini").attr("checked", false);
}


$('#cbox-sidebar-flat-style').click(function (){
    if ($(this).is(':checked')) {
        applyStyleFlat()
        localStorage.setItem("flatStyle", "true")
    } else {
        removeStyleFlat()
        localStorage.setItem("flatStyle", "false")
    }
})

function applyStyleFlat(){
    $('.nav-sidebar').addClass('nav-flat').addClass('nav-legacy')
    $('#cbox-sidebar-flat-style').attr("checked", true)
}

function removeStyleFlat(){
    $('.nav-sidebar').removeClass('nav-flat').removeClass('nav-legacy')
    $('#cbox-sidebar-flat-style').attr("checked", false)
}

// Desactiva o activa la expansiòn de elementos al hacer hover 
$('#cbox-sidebar-disable-focus').click(function (){
    if ($(this).is(':checked')) {
        disableFocus()
        localStorage.setItem("disableFocus", "true")
    } else {
        enableFocus()
        localStorage.setItem("disableFocus", "false")
    }
})

function disableFocus(){
    $('.main-sidebar').addClass('sidebar-no-expand')
    $('#cbox-sidebar-disable-focus').attr("checked", true)
}
function enableFocus(){
    $('.main-sidebar').removeClass('sidebar-no-expand')
    $('#cbox-sidebar-disable-focus').attr("checked", false)
}


// OPCIONES DE TEXTO PEQUEÑO
$('#cbox-small-text-content-wrapper').click(function (){
    if ($(this).is(':checked')) {
        applyTextSmallContent()
        localStorage.setItem("smallTextContent", "true")
    } else {
        removeTextSmallContent()
        localStorage.setItem("smallTextContent", "false")
    }
})

function applyTextSmallContent(){
    $('.content-wrapper').addClass('text-sm')
    $('#cbox-small-text-content-wrapper').attr("checked", true)
}

function removeTextSmallContent(){
    $('.content-wrapper').removeClass('text-sm')
    $('#cbox-small-text-content-wrapper').attr("checked", false)
}

$('#cbox-small-text-sidebar').click(function (){
    if ($(this).is(':checked')) {
        applyTextSmallSidebar()
        localStorage.setItem("smallTextSidebar", "true")
    } else {
        removeTextSmallSidebar()
        localStorage.setItem("smallTextSidebar", "false")
    }
})

function applyTextSmallSidebar(){
    $('.nav-sidebar').addClass('text-sm')
    $('.control-sidebar-content').addClass('text-sm')
    $('#cbox-small-text-sidebar').attr("checked", true)
}

function removeTextSmallSidebar(){
    $('.nav-sidebar').removeClass('text-sm')
    $('.control-sidebar-content').removeClass('text-sm')
    $('#cbox-small-text-sidebar').attr("checked", false)
}


// VARIABLES DEL NAVEGADOR
localStorage.getItem("theme") == "dark-mode" ? applyThemeDark(): applyThemeLight();
localStorage.getItem("minSidebar") == "true" ? applyValueSidebarMini(): removeValueSidebarMini();
localStorage.getItem("flatStyle") == "true"  ? applyStyleFlat(): removeStyleFlat();
localStorage.getItem("disableFocus") == "true" ? disableFocus(): enableFocus();
localStorage.getItem("smallTextContent") == "true" ? applyTextSmallContent(): removeTextSmallContent();
localStorage.getItem("smallTextSidebar") == "true" ? applyTextSmallSidebar(): removeTextSmallSidebar();

// BOTON SUBIR AL INICIO
$(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();

    if (scrollDistance > 450) {
        $('#back-to-top').removeClass('d-none');
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});
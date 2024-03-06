function getUrl() {
    let currentPage = window.location.href;
    let lastSlashIndex = currentPage.lastIndexOf("/");
    let extractURLPART = currentPage.substring(lastSlashIndex + 1);
    return extractURLPART;
}



function getForm()
{
    document.getElementById('disccusionForm').style.display = 'block';
}



  


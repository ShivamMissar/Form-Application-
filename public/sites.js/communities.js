function getUrl()
{
    let currentPage = window.location.href;
    let extractURLPART;
    extractURLPART = currentPage.split("community")[0];
    return extractURLPART;
}


function getForm()
{
    document.getElementById('disccusionForm').style.display = 'block';
}



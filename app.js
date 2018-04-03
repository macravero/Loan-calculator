//Listen for submit
document.querySelector("#loan-form").addEventListener('submit', function(e){
    //Hide results
    document.querySelector("#results").style.display = 'none';
    //Show Loader
    document.querySelector("#loading").style.display = 'block';
    //Make loader last 2 secs
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//calculate results
function calculateResults(){
    console.log('Calculating...');
    //UI Variables
    const $amount = document.querySelector("#amount");
    const $interest = document.querySelector("#interest");
    const $years = document.getElementById('years');
    const $monthlyPayment = document.querySelector("#monthly-payment");
    const $totalPayment = document.querySelector("#total-payment");
    const $totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat($amount.value);
    const calculatedInterest = parseFloat($interest.value) / 100 / 12;
    const calculatedPayments = parseFloat($years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal *x*calculatedInterest)/(x-1);
    //isFinite
    if(isFinite(monthly)) {
        $monthlyPayment.value = monthly.toFixed(2);
        $totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        $totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        //Show results
        document.querySelector("#results").style.display = 'block';
        //Hide loader
        document.querySelector("#loading").style.display = 'none';
    } else{
        //Custom error message function
        showError('Please check your numbers');
    }

   
}

//Show Error
function showError(error){
    //Hide results
    document.querySelector("#results").style.display = 'none';
    //Hide loader
    document.querySelector("#loading").style.display = 'none';
    //div
    const errorDiv = document.createElement('div');
    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //class
    errorDiv.className = 'alert alert-danger';
    //Text node appended
    errorDiv.appendChild(document.createTextNode(error));
    //Insert error above heading
    card.insertBefore(errorDiv, heading);
    //Clear error (4 seconds)
    setTimeout(clearError, 4000);
}

//Clear error
function clearError(){
    document.querySelector('.alert').remove();
}
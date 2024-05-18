async function checkAddress() {
  const resultContent = document.getElementById('resultContent');
  resultContent.innerHTML = '';
  const addressesInput = document.getElementById('ethAddresses').value.trim();
  if (!addressesInput) {
    resultContent.innerHTML = 'Please enter at least one Ethereum address.';
    showResult();
    return;
  }
  const addresses = addressesInput.split('\n').map(line => line.trim()).filter(line => line);
  try {
    const response = await fetch('./addys.csv');
    const csvText = await response.text();
    const csvAddresses = csvText.split('\n').map(line => line.trim());
    let matches = [];
    addresses.forEach(address => {
      if (csvAddresses.includes(address)) {
        matches.push(`${address}`);
      }
    });
    if (matches.length > 0) {
      resultContent.innerHTML = matches.join('<br>');
    } else {
      resultContent.innerHTML = 'No match found.';
    }
  } catch (error) {
    resultContent.innerHTML = 'Error checking the address list.';
    console.error('Error fetching the CSV file:', error);
  }
  showResult();
}

function showResult() {
  document.getElementById('overlay').classList.add('active');
  document.getElementById('resultBox').classList.add('active');
}

function closeResult() {
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('resultBox').classList.remove('active');
}
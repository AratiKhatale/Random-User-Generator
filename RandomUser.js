async function generateData() {
    const number = document.getElementById('number').value.trim();
    const userDiv = document.getElementById('userDiv');
    const errorMsg = document.getElementById('error-msg');

    if (!number || isNaN(number) || Number(number) <= 0) {
        errorMsg.style.display = 'block'; 
        userDiv.innerHTML = ''; 
        return;
    } else {
        errorMsg.style.display = 'none'; 
    }
    userDiv.innerHTML = '';

    try {
        const response = await fetch(`https://randomuser.me/api/?results=${number}`);
        const result = await response.json();
        result.results.forEach((data) => {
            const userCard = document.createElement('div');
            userCard.classList.add('grid-container');

            const img = document.createElement('img');
            img.src = data.picture.medium;

            const name = document.createElement('h3');
            name.textContent = `${data.name.first} ${data.name.last}`;

            const email = document.createElement('h3');
            email.textContent = data.email;

            userCard.appendChild(img);
            userCard.appendChild(name);
            userCard.appendChild(email);
            userDiv.appendChild(userCard);
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        userDiv.innerHTML = '<p style="color: red;">Error fetching user data. Please try again later.</p>';
    }
}

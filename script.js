const startingBid = document.getElementById("startingbid");
const education = document.getElementById("education");
const networth = document.getElementById("networth");
const caste = document.getElementById("caste");
const skills = document.getElementsByClassName("skills");
const age = document.getElementsByName("age");
const reputation = document.getElementsByClassName("reputation");
const nameInput = document.getElementById("name");
const loveLetter = document.getElementById("love_letter");
const resultOutput = document.getElementById("finalOutput");

const calculate = () => {
    const name = nameInput.value.trim();
    let price = Number(startingBid.value);

    if (!name || isNaN(price) === 0) {
        alert("Please fill in all fields!");
        return;
    }

    price *= Number(education.value);
    price *= Number(networth.value);
    price += Number(caste.value);

    price = getCheckboxValuesFilterReduce(skills, price);
    price = getRadioValue(age, price);
    price = getCheckboxValuesForLoop(reputation, price);

    let person = {
        bride_name: name,
        bride_price: price,
        letter_to_bride: loveLetter.value
    };

    resultOutput.innerHTML = `Your price for ${person.bride_name} is $${person.bride_price}. Love letter: "${person.letter_to_bride}"`;
}

const getCheckboxValuesFilterReduce = (html_collection, price) => {
    return Array.from(html_collection)
        .filter(item => item.checked)
        .reduce((acc, item) => acc + Number(item.value), price);
}

const getRadioValue = (node_list, price) => {
    node_list.forEach(item => {
        if (item.checked) {
            price *= Number(item.value);
        }
    });
    return price;
}

const getCheckboxValuesForLoop = (html_collection, price) => {
    for (let i = 0; i < html_collection.length; i++) {
        if (html_collection[i].checked) {
            price += Number(html_collection[i].value);
        }
    }
    return price;
}

document.getElementById("submit").addEventListener("click", calculate);

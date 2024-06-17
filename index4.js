let myLeads = {}
const inputEl = document.getElementById("input-el")
const groupEl = document.getElementById("group-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const group = groupEl.value.trim()
        if (!myLeads[group]) {
            myLeads[group] = []
        }
        myLeads[group].push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (const group in leads) {
        listItems += `<li><strong>${group}</strong><ul>`
        for (let i = 0; i < leads[group].length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[group][i]}'>
                        ${leads[group][i]}
                    </a>
                </li>
            `
        }
        listItems += `</ul></li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    const group = groupEl.value.trim()
    if (myLeads[group] && myLeads[group].length > 0) {
        myLeads[group].pop() // Remove the last element from the group
        if (myLeads[group].length === 0) {
            delete myLeads[group] // Remove the group if it's empty
        }
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})

inputBtn.addEventListener("click", function() {
    const group = groupEl.value.trim()
    if (!myLeads[group]) {
        myLeads[group] = []
    }
    myLeads[group].push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

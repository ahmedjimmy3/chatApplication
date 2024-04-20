const baseURL = 'http://localhost:5000'
const clintIo = io(baseURL)
//Token and headers
const token = `Hamada__${localStorage.getItem("token")}`
var decoded = jwt_decode(token);
document.getElementById("userName").innerHTML = `${decoded.username}`
console.log(decoded.username)
const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'token': token
}

//images links
let avatar = './avatar/Avatar-No-Background.png'
let meImage = ''
let friendImage = ''

//save socket id
clintIo.emit("updateSocketId", { token })


//collect messageInfo
function sendMessage(destId) {
    console.log({ destId });
    const data = {
        message: $("#messageBody").val(),
        destId,
    }

    axios({
        method: 'post',
        url: `${baseURL}/chat/`,
        data: data,
        headers
    }).then(function (response) {
        console.log({ response });
        const { message, chat } = response.data
        if (message == "Done") {
            console.log("Done");

            if (chat) {
                meImage = chat.pOne.image?.secure_url || avatar
                friendImage = chat.pTwo.image?.secure_url || avatar
            }
            const div = document.createElement('div');

            div.className = 'me text-end p-2';
            div.dir = 'rtl';
            div.innerHTML = `
            <img class="chatImage" src="${meImage}" alt="" srcset="">
            <span class="mx-2">${data.message}</span>
            `;
            document.getElementById('messageList').appendChild(div);
            $(".noResult").hide()
            $("#messageBody").val('')


        } else {
            alert("Failed to send this message please check your connection")
        }
    }).catch(function (error) {
        console.log(error);
    });

}

//receiveMessage
clintIo.on("receiveMessage", (message) => {
    const div = document.createElement('div');
    div.className = 'myFriend p-2';
    div.dir = 'ltr';
    div.innerHTML = `
    <img class="chatImage" src="${friendImage}" alt="" srcset="">
    <span class="mx-2">${message}</span>
    `;
    document.getElementById('messageList').appendChild(div);
})


// ******************************************************************** Show chat conversation
function showData(chat) {
    document.getElementById('messageList').innerHTML = ''
    if (chat.messages?.length) {
        $(".noResult").hide()

        for (const message of chat.messages) {
            if (message.from.toString() == decoded.id) {
                const div = document.createElement('div');
                div.className = 'me text-end p-2';
                div.dir = 'rtl';
                div.innerHTML = `
                <img class="chatImage" src="${meImage}" alt="" srcset="">
                <span class="mx-2">${message.message}</span>
                `;
                document.getElementById('messageList').appendChild(div);
            } else {
                const div = document.createElement('div');
                div.className = 'myFriend p-2';
                div.dir = 'ltr';
                div.innerHTML = `
                <img class="chatImage" src="${friendImage}" alt="" srcset="">
                <span class="mx-2">${message.message}</span>
                `;
                document.getElementById('messageList').appendChild(div);
            }

        }
    } else {
        const div = document.createElement('div');

        div.className = 'noResult text-center  p-2';
        div.dir = 'ltr';
        div.innerHTML = `
        <span class="mx-2">Say Hi to start the conversation.</span>
        `;
        document.getElementById('messageList').appendChild(div);
    }

}

//get chat conversation between 2 users and pass it to ShowData fun
function displayChatUser(destId) {
    console.log({destId});
    axios({
        method: 'get',
        url: `${baseURL}/chat/${destId}`,
        headers
    }).then(function (response) {
        const { chat } = response.data
        console.log(chat);
        if (chat) {
            if (chat.pOne._id.toString() == decoded.id) {
                meImage = chat.pOne.image?.secure_url || avatar
                friendImage = chat.pTwo.image?.secure_url || avatar
            } else {
                friendImage = chat.pOne.image?.secure_url || avatar
                meImage = chat.pTwo.image?.secure_url || avatar
            }

            showData(chat)
        }else{
            showData(0)
        }
        document.getElementById("sendMessage").setAttribute("onclick", `sendMessage('${destId}')`);

    }).catch(function (error) {
        console.log(error);
    });
}
// ********************************************************************

// ==============================================================================================


// ********************************************************* Show Users list 
// Display Users
function getUsersData() {
    axios({
        method: 'get',
        url: `${baseURL}/user/`,
        headers
    }).then(function (response) {
        console.log({ D: response.data });
        const { users } = response.data
        showUsersData(users)
    }).catch(function (error) {
        console.log(error);
    });
}
// Show friends list
function showUsersData(users = []) {
    let cartonna = ``
    for (let i = 0; i < users.length; i++) {
        cartonna += `
        <div onclick="displayChatUser('${users[i]._id}')" class="chatUser my-2">
        <img class="chatImage" src="${users[i].image?.secure_url || avatar}" alt="" srcset="">
        <span class="ps-2">${users[i].username}</span>
    </div>
        
        `
    }

    document.getElementById('chatUsers').innerHTML = cartonna;



}
getUsersData()
// ********************************************************* Show Users list 






// =============================================OLD Code

// Display Chat  content
// function getData() {
//     axios({
//         method: 'get',
//         url: `${baseURL}/chat/${localStorage.getItem("chatId")}`,
//         headers
//     }).then(function (response) {
//         const { chat } = response.data
//         console.log(chat);
//         if (chat) {
//             if (chat.POne._id.toString() == decoded.id) {
//                 meImage = chat.POne.image?.secure_url
//                 friendImage = chat.PTwo.image?.secure_url
//             } else {
//                 friendImage = chat.POne.image?.secure_url
//                 meImage = chat.PTwo.image?.secure_url
//             }
//         }
//         showData(chat)
//     }).catch(function (error) {
//         console.log(error);
//     });
// }
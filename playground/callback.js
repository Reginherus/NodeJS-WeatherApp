var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Nate'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(28, (user) => {
    console.log(user);
});
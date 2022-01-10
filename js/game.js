class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data)=>({
            gameState: data.val()
        }));
    }

    update(game){
        gameState = game;
        database.ref("/").update({
            gameState: game
        });
    }
}
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}



const app = Vue.createApp({
    data(){
        return{
           playerHealth: 100,
           monsterHealth: 100,
           currentRound: 0,
           winner: null,
           showBtn: true,
           logMsg: []
        }
    },
    methods:{
        attackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMsg('player', 'attack', attackValue)
            this.attackPlayer(); 
            
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMsg('monster', 'attack', attackValue)
        },
        specialAttackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMsg('player', 'attack', attackValue)
            this.attackPlayer();
        },
        specialAttackPlayer(){
            const attackValue = getRandomValue(10, 25);
            this.playerHealth -= attackValue;
            this.addLogMsg('monster', 'attack', attackValue)

            
        },
        healPlayer(){
            this.currentRound ++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100){
                this.playerHealth = 100;

            } else {
                this.playerHealth += healValue;
            };
            this.addLogMsg('player', 'heal', healValue)
            this.attackPlayer();
            
        },
        restarGame(){

            this.playerHealth = 100
            this.monsterHealth = 100
            this.currentRound = 0
            this.winner = null
            this.showBtn = true
            this.logMsg = []
        },
        surrender(){
            this.winner = 'monster';
            this.showBtn = false;
        },
        addLogMsg(who, what, value){
            this.logMsg.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !==0
        }
        
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner= 'draw'
                this.showBtn = false;
            }
            else if (value <=0) {
                this.winner= 'monster'
                this.showBtn = false;
            }
            
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner= 'draw';
                this.showBtn = false;
            }
            else if (value <=0) {
                this.winner= 'player'
                this.showBtn = false;
            }
            

        }
    }
});

app.mount('#game');
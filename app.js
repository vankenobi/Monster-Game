new Vue({
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        logs : [{turn : "", text : ""}],
        attack_multiple : 10,
        special_attack_multiple : 25,
        monster_attack_multiple : 25,
        heal_up_multiple : 20,
    },
    methods : {
        start_game : function(){
            this.game_is_on = true;
        },
        
        attack : function(){
            var point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_heal -= point;
            this.monster_attack();
            this.add_to_log({turn : "p", text : "Oyuncu Atağı (" + point + ")"});
        },

        special_attack : function(){
            var point = Math.ceil(Math.random() * this.special_attack_multiple);
            this.monster_heal -= point;
            this.add_to_log({turn : "p", text : "Özel Oyuncu Atağı (" + point + ")"});
            this.monster_attack();
            
 
        },

        heal_up : function(){
            var point = Math.ceil(Math.random() * this.heal_up_multiple);
            this.player_heal += point;
            this.add_to_log({turn : "p", text : "İlk Yardım (" + point + ")"});
            this.monster_attack();

        },

        give_up : function(){
            this.player_heal = 0;
            this.add_to_log({turn : "p", text : "Oyuncu Pes Etti !!"});
        },
        monster_attack : function(){
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.add_to_log({turn : "m", text : "Canavar Atağı (" + point + ")"});
            this.player_heal -= point;

        },

        add_to_log : function(log){
            this.logs.push(log)
        }
    },
    
    watch : {
        player_heal : function(value){
            if(value <= 0){
                this.player_heal = 0
                var decision = confirm("Oyunu Kaybettin. Tekrar Denemek ister misin ? ")
                if(decision == true){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                }
                this.logs = [];
            }
            else if(value >= 100){
                this.player_heal = 100;
            }
        },

        monster_heal : function(value){
            if(value <= 0){
                this.monster_heal = 0
                var decision = confirm("Oyunu kazandın. Tekrar Denemek ister misin ? ")
                if(decision == true){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                }
                this.logs = [];
            }
            else if(value >= 100){
                this.monster_heal = 100;
            }
        }
    }
})
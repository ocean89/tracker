var StorageManager = {
    init : function(){
        if(localStorage){
            var storage = localStorage.getItem("storage");
            if(!storage){
                storage = {
                    user : "martin",
                    tracks : []
                }

                localStorage.setItem("storage", JSON.stringify(storage));
            }
        }
    },
    addTrack : function(track){
        if(localStorage){
            var storage = JSON.parse(localStorage.getItem("storage"));
            storage.tracks.push(track);

            localStorage.setItem("storage", JSON.stringify(storage));
        }
    },
    getTracks : function(){
        if(localStorage){
            var storage = JSON.parse(localStorage.getItem("storage"));
            return storage.tracks;
        }
        else{
            return [];
        }
    },
    reset : function(){
        if(localStorage){
            var storage = localStorage.getItem("storage");
            storage = {
                user : "martin",
                tracks : []
            }

            localStorage.setItem("storage", JSON.stringify(storage));
        }
    }
};

StorageManager.init();
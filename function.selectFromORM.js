function selectFromORM(ORM){

        var object_type;
        var select_html;
        var selected_col;
//add code for auto-complete detection engine...

        object_type = ORM.name;
        select_name = object_type + "_id";
//      select_name = '123';
        select_html = "<select name='" + select_name + "'>\n";


        ORM.findAll().success(function(things) {

                __.each(things,function(a_thing){
                        //lets determine what the variable
                        //from the table should be the label for the
                        //select box...
                        if(selected_col === undefined){
                                selected = a_thing.attributes;
                                __.each(selected,function(key,value){
                                if(key.indexOf("name") !== -1){
                                        //then this is my select variable..
                                                selected_col = key;
                //                              console.log("inside key" + key);
                                        }
                                });
                        }

                        select_html = select_html               +
                                        "<option value='"       +
                                        a_thing.id              +
                                        "'>"                    +
                                a_thing[selected_col] + "</option>\n";

                });
                select_html = select_html + "</select>\n";
                return(select_html);
        });


}


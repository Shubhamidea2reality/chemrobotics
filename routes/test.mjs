/*
 * GET Test data from db.
 */
export const getdata =(req,res) =>{

    req.getConnection(function(err,connection){
       
        var query = connection.query('select * from technical_routes',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            //console.log(rows);    
            res.send(rows);
                
           
         });
         
         //console.log(query.sql);
    });
}


/*
 * UPDATE Template Table Details.
 */
export const UpdateTemplateTableDetails =(req,res) =>{

    var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    req.getConnection(function(err,connection){
       
        var query = connection.query(`UPDATE tbl_ServerUpload_Tables SET Default_Grid_RowsCount=${postdata.Default_Grid_RowsCount}, Default_DownloadRec_Limit=${postdata.Default_DownloadRec_Limit} WHERE TableName='${postdata.tablename}'`,function(err,rows)
        {
            
            if(err)
            {
                console.log("Error Selecting : %s ",err );
                res.send({status:"error",Message:err.sqlMessage});
            }
            else{
     
            //console.log(rows);    
            res.send(rows);
            }
                
           
         });
         
         //console.log(query.sql);
    });
}

/*
 * GET Template Table Details.
 */
export const GetTemplateTableDetails =(req,res) =>{

    var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    req.getConnection(function(err,connection){
       
        var query = connection.query(`SELECT * FROM tbl_ServerUpload_Tables WHERE TableName='${postdata.tablename}'`,function(err,rows)
        {
            
            if(err)
            {
                console.log("Error Selecting : %s ",err );
                res.send({status:"error",Message:err.sqlMessage});
            }
            else{
     
            //console.log(rows);    
            res.send(rows);
            }
                
           
         });
         
         //console.log(query.sql);
    });
}

/*
 * GET Template Table Column Details.
 */
export const GettemplateDetails =(req,res) =>{

    var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    req.getConnection(function(err,connection){
       
        var query = connection.query(`select * from ${postdata.tablename}`,function(err,rows) // moongo convert
        
        {
            
            if(err)
            {
                console.log("Error Selecting : %s ",err );
                res.send({status:"error",Message:err.sqlMessage});
            }
            else{
     
            //console.log(rows);    
            res.send(rows);
            }
                
           
         });
         
         //console.log(query.sql);
    });
}

/*
 * GET Template Table Column Details.
 */
export const GetTableDetails =(req,res) =>{

    var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    req.getConnection(function(err,connection){
       
        var query = connection.query(`SELECT * FROM tbl_ServerUpload_Tables ORDER BY PriorityNo`,function(err,rows)
        {
            
            if(err)
            {
                console.log("Error Selecting : %s ",err );
                res.send({status:"error",Message:err.sqlMessage});
            }
            else{
     
            //console.log(rows);    
            res.send(rows);
            }
                
           
         });
         
         //console.log(query.sql);
    });
}

/*
 * POST - Empty the Table data for given Table
 */
export const EmptyTableData =(req,res) =>{

    var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    // req.getConnection(function(err,connection){
       
    //     var query = connection.query(`TRUNCATE TABLE ${postdata.tablename}`,function(err,rows)
    //     {
            
    //         if(err)
    //         {
    //             console.log("Error Selecting : %s ",err );
    //             res.send({status:"error",Message:err.sqlMessage});
    //         }
    //         else{
     
    //         //console.log(rows);    
    //         res.send(rows);
    //         }
                
           
    //      });
         
    //      //console.log(query.sql);
    // });
}


/*
 * POST - Run the fileupload storedproceure 
    postdata.storedprocedure (string) --- Procedure Name
    postdata.IsEmpty--0(Not Empty)  1- Empty
 */
export const RunFileUploadProcedure =(req,res) =>{

    var postdata = JSON.parse(JSON.stringify(req.body));

    //console.log(postdata);

    req.getConnection(function(err,connection){
       
        var query = connection.query(`CALL ${postdata.storedprocedure}(${postdata.IsEmpty})`,function(err,rows)
        {
            
            if(err)
            {
                console.log("Error Selecting : %s ",err );
                res.send({status:"error",Message:err.sqlMessage});
            }
            else{
     
            //console.log(rows);    
            res.send(rows);
            }
                
           
         });
         
         //console.log(query.sql);
    });
}
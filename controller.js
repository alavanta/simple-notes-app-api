'use strict'

const response = require('./response');
const conn = require('./connect.js');

exports.getNotes = function (req, res) {
    let page=req.query.page;
    let limit=req.query.limit;
    let title="%"+req.query.title+"%" ;
    if(title=="%undefined%"){
        title="%%";
    }
    let sort= req.query.sort;
    
    console.log("page : "+page+" title : "+title);
    let parameter=page*10;
    if(page || limit){
        
        conn.query(
            `select title,note,category.name 'category' from notes  inner join category  on category.id = notes.category where title like ? order by time asc limit ?,? ;`,[title,parameter-10,parameter],
            function (error, rows, field) {
                if (error) {
                    throw error
                } else {
                    if (rows.length == 0) {
                        return res.send({
                            message: "no record found"
                        })
                    } else {
                        return res.send({
                            data: rows,
                        })
                    }
                }
            }
        )
    }
    else{
    conn.query(
        `select title, note, c.name 'category'  from notes n inner join category c on c.id = n.category;`,
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                if (rows.length == 0) {
                    return res.send({
                        message: "no record found"
                    })
                } else {
                    return res.send({
                        data: rows,
                    })
                }
            }
        }
    )}
}


exports.getNotesByTitle = function (req, res) {
    let title = "%" + req.params.title + "%";

    conn.query(
        `select title,note,category.name 'category' from notes  inner join category  on category.id = notes.category where notes.title like ?;`, [title],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                if (rows.length != 0) {
                    return res.send({
                        data: rows,
                    })
                } else {
                    return res.send({
                        message: "no record found"
                    })
                }
            }
        }
    )
}

exports.addNote = function (req, res) {
    let title = req.body.title;
    let note = req.body.note;
    let category = req.body.category;

    conn.query(
        `INSERT INTO notes SET title=?,note=?,category=?`, [title, note, category],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'data created successfully!'
                })
            }
        }
    )
}

exports.patchNote = function (req, res) {

    let id = req.params.id;
    let title = req.body.title;
    let note = req.body.note;
    let category = req.body.category;
    conn.query(
        `UPDATE notes SET title=?,note=?,category=? WHERE id=?`, [title, note, category, id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'data updated successfully!'
                })
            }
        }
    )
}

exports.deleteNote = function (req, res) {
    let id = req.params.id;

    conn.query(
        `DELETE FROM notes WHERE id=?;`, [id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'data deleted!'
                })
            }
        }
    )
}

exports.addCategory = function (req, res) {
    let name = req.body.name;

    conn.query(
        `INSERT INTO category SET name=?;`, [name],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {

                return res.send({
                    message: "data created!"
                })
            }
        }
    )
}


exports.patchCategory = function (req, res) {
    let id = req.params.id;
    let name = req.body.name;

    conn.query(
        `UPDATE category SET name=? WHERE id=?;`, [name, id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    message: "data updated!"
                })
            }
        }
    )
}

exports.deleteCategory = function (req, res) {
    let id = req.params.id;

    conn.query(
        `DELETE FROM category WHERE id=?;`, [id],
        function (error, rows, field) {
            if (error) {
                throw error
            } else {
                return res.send({
                    message: "data deleted!"
                })
            }
        }
    )
}
const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./models/movies.json', 'utf-8'));

exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: 'success',
        count: movies.length,
        data: {
            movies: movies
        }
    })
}
exports.addNewMovie = (req, res) => {
    //GET ARRAY OBJECT COUNT
    let newID = Object.keys(movies).length;
    //CHECK IF ARRAY IS EMPTY THEN ASSIGN ID
    if (newID == 0) newID = 1;
    else  newID = movies[Object.keys(movies).length - 1].id + 1;
    //MERGE ID WITH NEW INPUT BODY
    let newMovie = Object.assign({id: newID}, req.body);
    //INSERT NEW OBJECT INTO THE ARRAY
    movies.push(newMovie);

    fs.writeFile('./models/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: 'success',
            count: Object.keys(movies).length,
            data: {
                movie: newMovie
            }
        })
    })
    console.log('New Movie Added Successfully!')
}
exports.updateMovie = (req, res) => {
    //STORE THE INPUT ID IN THE URL TO A VARIABLE
    let id = req.params.id * 1
    //CHECK IF THE INPUT ID EXIST IN THE ARRAY
    let idExist = movies.find(i => i.id === id)
    //RETURN ERROR MESSAGE IF DOESNT EXIST
    if (!idExist) return res.status(404).json({status: 'fail', message: `Movie doesn't exist!!!`})
    
    //GET INDEX OF QUERY ID
    let index = movies.indexOf(idExist)
    //MERGE NEW INPUT BODY TO THE EXISTING
    let newMovie = Object.assign(idExist, req.body)
    //UPDATE THE ARRAY
    movies[index] = newMovie
    
    fs.writeFile('./models/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: 'successs',
            count: Object.keys(movies).length,
            data: {
                updatedMovie: newMovie
            }
        })
    })
    console.log('Updated Successfully!')
}
exports.deleteMovie = (req, res) => {
    let id = req.params.id * 1
    let idExist = movies.find(i => i.id === id)
    if (!idExist) return res.status(404).json({status: 'fail', message: 'Invalid ID!!!'})
    
    let index = movies.indexOf(idExist)
    movies.splice(index, 1)

    fs.writeFile('./models/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: 'success',
            count: Object.keys(movies).length,
            data: {
                movies: movies
            }
        })
    })
    
    console.log('Deleted Successfully!')
}
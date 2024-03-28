const cors = require ("cors")

//express importado 
const express = require ('express')

// uuid importado
const {v4} = require ("uuid")

// express passa a ser chamado de app
const app = express()
const port = 3001
app.use(express.json())
app.use(cors())


const users = []

const checkUserId = (req,res,next) => { 
    const {id} = req.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    req.userIndex = index
    req.userId = id

    next()

}

app.get('/users', (req, res) => { // get rota criada
    
    return res.json(users)
    })


    //usando body params
app.post('/users', (req, res) => { // post rota criada

            const {name, age} = req.body
           
            const user = {id:v4(),name , age}

            users.push(user)

        return res.status(201).json(user)
    })

    //usando route params
app.put('/users/:id', checkUserId, (req, res) => { // post rota criada

    const index = req.userIndex
    const id = req.userId
    
    const {name, age} = req.body
    
    const updadtedUser = {id, name, age}

    users[index] = updadtedUser

    return res.json(updadtedUser)
})

app.delete('/users/:id', checkUserId, (req, res) => { // delete rota criada

    const index = req.userIndex

    users.splice(index,1)

    return res.status(204).json()
})


//porta que está rodando
app.listen(port, () => {
    console.log(`${port} inquebrável 🎇`)
})
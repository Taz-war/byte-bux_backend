const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

///middleware
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tasks.jgnsfsc.mongodb.net/?retryWrites=true&w=majority&appName=tasks`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const taskCollection = client.db("TasksDB").collection("tasks");
      
        app.get('/tasks',async(req,res)=>{
            const response = taskCollection.find()
            const tasksData = await response.toArray()
            res.send(tasksData)
        })

        app.post('/tasks', async (req,res)=>{
            const task = req.body
            console.log('new task',task)
            const result = await taskCollection.insertOne(task);
            console.log(result)
            res.send(result)
        })

        app.put('/tasks/:id',async(req,res)=>{
            const id = req.params.id
            const Task = req.body
            const filter = {_id : new ObjectId(id)}
            const options = { upsert: true };

            const updatedTask = {
                $set:{
                    title: Task.title,
                    description: Task.description,
                    completed: Task.completed
                }
            }

            const result = taskCollection.updateOne(filter, updatedTask, options);
            res.send(result)
        })

        app.patch('/tasks/:id',async(req,res)=>{
            const id = req.params.id
            const status = req.body
            const filter = { _id : new ObjectId(id)}
            const options = {upsert : true}
            const updatedStatus = {
                $set: {
                    completed: status.completed
                }
            }
            const result = taskCollection.updateOne(filter, updatedStatus, options);
            res.send(result)
        })

        app.delete('/tasks/:id',async(req,res)=>{
            const id = req.params.id
            const query = { _id: new ObjectId(id) };
            const result = taskCollection.deleteOne(query)

            if (result.deletedCount === 0) {
                return res.status(404).send({ error: 'Task not found' });
            }

            res.send({ success: true, message: 'Task deleted successfully' });
            // res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Simple crud i running')
})

app.listen(port,()=>{
    console.log("SImple crud is running on"+port)
})

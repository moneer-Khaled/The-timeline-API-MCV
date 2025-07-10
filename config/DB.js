const mongoose= require('mongoose')

mongoose.connect('mongodb+srv://kmoneer25:project123@cluster2.rqqgyho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2')
.then(() => console.log('DB is connected'))
.catch(err  => console.log(err))



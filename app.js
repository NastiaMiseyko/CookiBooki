var express =require("express"),
app         =express(),
bodyParser  =require("body-parser"),
mongoose    =require("mongoose");

mongoose.connect("mongodb://localhost/cooki_booki");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var recipeSchema= new mongoose.Schema({
    
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now()}
});

var Recipes=mongoose.model("Recipes",recipeSchema);



app.get("/",function(req,res){
    res.redirect("/recipes");
});

app.get("/recipes",function(req,res){
    Recipes.find({},function(err, recipes){
        if(err){
            console.log("Error!");
        } else{
            res.render("index",{recipes:recipes});
        }
    });
});

app.get("/recipes/new",function(req,res){
    res.render("new");
});

app.post("/recipes",function(req,res){
    
    Recipes.create({
        
        title:req.body.recipe.title,
        image: req.body.recipe.image,
        body:req.body.recipe.body
    },function(err,newRecipe){
        if(err){
            res.render("new");
        }else{
            res.redirect("/recipes");
        }
        

    });
});

app.get("/recipes/:id",function(req,res){
    Recipes.findById(req.params.id,function(err,foundRecipe){
        if(err){
            res.redirect("/recipes");
        }else{
            res.render("show",{recipe:foundRecipe});
        }
    });
  
});

app.listen("3000",function(){
    console.log("Server started!!!");
});
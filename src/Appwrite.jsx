import { Client, Databases , Query, ID } from "appwrite"

const ProjectId = "68f65404001ef9200006"
const DatabaseId = "68f655a7000d9265b4ce"
const CollectionId = "metrics"

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(ProjectId)
  
const database = new Databases(client)

export const userSeachCount = async (search, movie) => {
    //  console.log(ProjectId,DatabaseId,CollectionId)
    //1. check search(Term) is exist in the database
    try {
        const result = await database.listDocuments(DatabaseId,CollectionId,[
            Query.equal('search',search),
        ])
        
        //2.if exist inscrease count
        if( result.documents.length > 0 ){
            const doc = result.documents[0]; //get that searched item's document
            await database.updateDocument(DatabaseId,CollectionId, doc.$id, {
                count: doc.count + 1, //update count of that document
            }
            )
        }
        //3. if not exist create new documnent with search(Term) and set count as 1
        else{
            await database.createDocument(DatabaseId,CollectionId, ID.unique(), {
            search,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            }
            
            )
        }

    } catch(error){
        console.log(error)
    }
}

export const treandingmovies = async () => {
    try {
        const result = await database.listDocuments(DatabaseId,CollectionId, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents; //fetch the data from database
    } catch(error){
        console.log(`treandingmovie error : ${error}`)
    }
}
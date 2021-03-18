//create sessionStorage for posts if doesn't exist
if(sessionStorage.getItem("posts") === null) {
            
    sessionStorage.setItem("posts", JSON.stringify([]));

}

//render posts from sessionStorage
let blogPosts = JSON.parse(sessionStorage.getItem("posts"));

//for each post generate Post card element with these properties
blogPosts.forEach((postDetails, i) => {

    const {title, body, tags, img} = postDetails;

    let newRow = '';
    //checks if post needs a new row
    if((i + 1) % 3 == 1) {
        newRow = document.createElement("div"); newRow.className = "row row-cols-1 row-cols-md-3 md-3";
    }
    
    //create elements of blog post div w style
    let cardDiv = document.createElement("div"); cardDiv.className = "col";
    let cardRim = document.createElement("div"); cardRim.className = "card mb-4 shadow-sm";
    let imgDiv = document.createElement("div"); imgDiv.className = "col-auto d-none d-lg-block";
    let thumbnail = document.createElement("img"); thumbnail.className = "w-100"; thumbnail.height = "250";
    let cardBody = document.createElement("div"); cardBody.className = "card-body";
    let cardTitle = document.createElement("h2"); cardTitle.className = "card-title";
    let postContent = document.createElement("div"); postContent.className = "text-truncate";
    let contLink = document.createElement("a"); contLink.className = "stretched-link";
    let lnBreak = document.createElement("br");
    let tagsDiv = document.createElement("small"); tagsDiv.className = "text-muted";
    
    //post content assignment
    cardTitle.innerHTML = title;
    thumbnail.src = "https://picsum.photos/250/250?grayscale"; //this is where img file would be if uploading was ok
    postContent.innerHTML = body;
    tagsDiv.innerHTML = "Tags: " + tags;

    //stitch card elements together
    cardDiv.appendChild(cardRim);
    cardRim.appendChild(imgDiv);
    imgDiv.appendChild(thumbnail);
    cardRim.appendChild(cardBody);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(postContent);
    cardBody.appendChild(lnBreak);
    cardBody.appendChild(tagsDiv);


    //append new card element onto the current post list
    if(newRow !== '') {
        newRow.appendChild(cardDiv);
        document.getElementById("postList").appendChild(newRow);
    } else {
        document.getElementById("postList").lastElementChild.appendChild(cardDiv);
    }
    
    

});

//function that adds blog posts to sessionStorage from the modal form
let onAddPost = () => {
    //retrieve details from form inputs
    let blogDetails = {

        title: document.getElementById('title').value,
        body: document.getElementById('body').value,
        tags: document.getElementById('tags').value,
        img:  document.getElementById('img').value

    }

    //get current database state
    let currentStorage = JSON.parse(sessionStorage.getItem("posts"));

    //update database
    currentStorage.push(blogDetails);

    //push updated database back into storage
    sessionStorage.setItem("posts", JSON.stringify(currentStorage));
    
    $('#addPost').modal('hide');
    document.location.reload();
    
}
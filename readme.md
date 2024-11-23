### service 


|method |path |authen | params | query | body |
|:----- |:--- |:----:  |:------ |:----- |:---- |
|post|/auth/register|-|-|-|{ email,username, password, confirmPassword }
|post|/auth/login|-|-|-|{ username, password }


|get|/post|y|-|-|-|
|post|/post|y|-|-|{message, image(file)}
|put|/post|y|:id|-|{message, image(file)}
|delete|/post|y|:id|-|-


|post|/comment|y|-|-|{message, postId} 
|post|/like|y|-|-|{postId}
|delete|/like|y|:id|-|-


---
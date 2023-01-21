## Jobs API



### Hashing
    ///A cryptographic salt is made up of random bits added to each password instance before its hashing
    ///Salts create unique passwords even in the instance of two users choosing the same passwords.
    ///Salts help us mitigate hash table attacks by forcing attackers to re-compute them using the salts for each user.

    //Bigger the number, more random bits, more secured.
    // More rounds = > more processing power. 
``` 

    const salt = await bcrypt.genSalt(10)
    
    const hashedPassword = await bcrypt.hash(password,salt)
    const tempUser = {username, email, password: hashedPassword}
    const user = await User.create({ ...tempUser });

```


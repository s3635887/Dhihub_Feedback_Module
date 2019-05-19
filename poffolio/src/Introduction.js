import React, {Component} from 'react'

class Introduction extends Component{
    render(){
        return(
            <div>
                <header>
                <nav>
                    <div class="row">
                        <ul class="main-nav">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Products</a></li>
                            <li><a href="/create_survey">features</a></li>
                            <li><a href="/create_survey">Log In</a></li>
                        </ul>
                    </div>
                </nav>
                <div class="hero-text-box">
                    <h1>Wellcome to chatbot.<br/> Let's exploit the newest technology!</h1>
                    <a class="btn btn-full" href="#">About us</a>
                    <a class="btn btn-ghost" href="#">show me more</a>
                </div>
                </header>

                <section class="section-feature">
                <div class="row">
                    <h2>Products.</h2>
                    <p class="long-copy">Dhihub offers AI powered chatbots and business solutions for HR, aimed at increasing employee engagement, productivity and wellbeing.
                        </p>                
                </div>

                <div class="row">
                    <div class="col span-1-of-5 box">
                        <ion-icon class="icon-big" name="heart"></ion-icon>
                        <h3>Feedback Management</h3>
                        <p>AI powered continuous feedback system between Organisation and Employees
                            </p>
                </div>
                <div class="col span-1-of-5 box">
                    <ion-icon class="icon-big" name="paper-plane"></ion-icon>
                    <h3>Leave and Time Management</h3>
                    <p>Share materials and review employee competency with ease.
                    </p>
                </div>

                <div  class="col span-1-of-5 box">
                    <ion-icon class="icon-big" name="construct"></ion-icon>
                    <h3>Training and Development</h3>
                        <p>All our vegetables are fresh, organic and local. Animals are raised without added hormones or antibiotics. Good for your health, the environment, and it also tastes better!
                        </p>                
                </div>
                <div class="col span-1-of-5 box">
                    <ion-icon class="icon-big" name="cloud-download"></ion-icon>
                    <h3>Policy and Procedure Management</h3>
                    <p>AI powered chatbots that answers employee queries 24X7.No more lengthy emails!
                    </p>
                </div>
                <div class="col span-1-of-5 box">
                    <ion-icon class="icon-big" name="cloud-download"></ion-icon>
                    <h3>Database Management System</h3>
                    <p>Keep Employee Database up-to-date and audit ready with alerts and reminders.</p>
                </div>
            </div>
            </section>
            <section class="section-form">
                <div class="row">
                    <h2>Please fill your contact details below:</h2>
                </div>
                <div class="row">
                    <form method="post" action="#" class="contact-form">
                        <div class="row">
                            <div class="col span-1-of-3">
                                <label for="name">Name</label>
                            </div>
                            <div class="col span-2-of-3">
                                <input type="text" name="name" id="name" placeholder="Your name" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col span-1-of-3">
                                <label for="email">Company Email</label>
                            </div>
                            <div class="col span-2-of-3">
                                <input type="email" name="email" id="email" placeholder=" Email" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col span-1-of-3">
                                <label for="email">Company Website</label>
                            </div>
                            <div class="col span-2-of-3">
                                <input type="email" name="email" id="email" placeholder="Website" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col span-1-of-3">
                                <label for="find-us">Subject</label>
                            </div>
                            <div class="col span-2-of-3">
                                <select name="subject" id="subject">
                                    <option value="friends" selected>Computer Science</option>
                                    <option value="search">Accounting</option>
                                    <option value="ad">Maketting</option>
                                    <option value="other">Software Engineering</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col span-1-of-3">
                                <label for="email">Phone</label>
                            </div>
                            <div class="col span-2-of-3">
                                <input type="email" name="email" id="email" placeholder="Phone" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col span-1-of-3">
                                <label for="email">Address</label>
                            </div>
                            <div class="col span-2-of-3">
                                <input type="email" name="email" id="email" placeholder="Address" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col span-1-of-3">
                                <label>&nbsp;</label>
                            </div>
                            <div class="col span-2-of-3">
                                <input type="submit" value="Send it!"/>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            </div>
        )
        
    }
}

export default Introduction
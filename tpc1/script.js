var elem = document.getElementById("js_script");
var elemParfum = document.getElementById("parfum");
var elemWisteria = document.getElementById("wisterias");
var elemAbout = document.getElementById("about_us");


elemAbout.addEventListener("click", function(){
    elem.innerHTML = `
        <div class="about_container">
            Founded in 1992, Glycine set out with the simple idea of making luxury perfume brands accessible to everyone at an affordable price. 
            With the first store openings in Birmingham, Belfast & Milton Keynes, Glycine developed a genuine passion for delighting customers with expert perfume knowledge and the highest customer service standards which remain at the forefront of everything the brand stands for today. 
        
            We are the leading perfume experts in the UK. 
            You can be sure that you are in the best place when making a purchase at The Perfume Shop. 
            We have trained and developed the most knowledgeable team of sales advisors in the perfume industry, proudly boasting the largest number of industry recognised CFSS (Certified Fragrance Sales Specialist) graduates in the UK. 
            To further showcase our dedication to fragrance expertise, we recently established our own innovative programme, "The Perfume School”, so that you can always have confidence in our high quality, unbiased advice every time you shop.
        
        </div>`
});

elemParfum.addEventListener("click", function(){
    elem.innerHTML = `
    <div class="perfum">

        <img src="perfum.png" class="perfum_img">
    
        <div class="perfum_details">

            <div class="perfum_title">Glycine Eau de Parfum</div>
            <p style="font-weight: bold;">$29,99</p>            
            <p style="margin-bottom: 4vh"> Out of stock</p>

            <p>
            <div class="subtitle_perfum">
                Fragrance description  
            </div>
            <div class="perfum_desc">
                The delicate and unexpected fruity-floral fragrance for women creates a soft whirlwind of happiness, fantasy, and radiance.
            </div>
            </p>

            <p>
            <div class="subtitle_perfum">
                Composition
            </div>
            <div class="perfum_desc">
                A green and fruity Grapefruit-Quince accord intertwines with the softness of Wisterias and the smoothness of White Musks for an intoxicatingly light, floral trail.
            </div>
            </p>

            <p>
            <div class="subtitle_perfum">
                How to apply
            </div>
            
            <div class="perfum_desc">
            The Eau de Parfum comes in a spray bottle for generous use and effortless application on skin or clothing.
            </div>
            
            </p>

        </div>
    </div>
    `
});

elemWisteria.addEventListener("click", function(){
    elem.innerHTML = `
    <div class="wist">
        <img src="wist.png" style="margin-left:5vw;width: 65vw;">
    

        <div class="wist_text">
        <p>
        This spring bloomer is a favorite of gardeners everywhere. 
        They train the beloved vine up arbors, across porches, and into trees, expectantly awaiting the spring day their wisteria bursts into fragrant bloom. 
        Wisteria is one romantic Southern vine, and we love it. Why?
        </p> 

        <br></br>
            <div class="subtitle">
                It has style.    
            </div>
            
        <p>
        Wisteria is no wallflower. 
        When you see it draped over an arbor, dripping with magnificent purple blooms fading from lavender to indigo, you're enchanted. 
        With just a glimpse, it can win over even the most vine-averse of garden aficionados. 
        And when a spring breeze carries through its blooms, it's pure Southern charm. 
        Wisteria also comes in other pretty pastel hues, including blue, pink, and white.    
        </p>
    
        <p>
            <div class="subtitle">
                It can climb.
            </div>
        Wisteria can grow nearly anywhere. 
        It's been known to reach impressive heights, but it can also grow in containers or as stand-alone trees. 
        It does need some structure, though, so if you're trying to train wisteria, support its growth with a strong, sturdy frame.
        </p> 
        <p>
    
            <div class="subtitle">
                It's an early bloomer.
            </div>
        We all know that daffodils signal the start of spring, but wisteria isn't far behind.
        It reminds us that crisp blue skies and warmer weather are on the way. 
        The winding woody vines burst into bloom, riotous with the sensations of spring.
        </p> 
        
        <p>
            <div class="subtitle">
                It smells divine.
            </div>
        There's a reason perfumers turn to the natural world for inspiration. 
        However, nothing bottled can quite live up to a whiff of a cluster of wisteria blooms. 
        The next time you see blooming wisteria, stop and enjoy the sweet scent. 
        It's fleeting, but during its spring bloom, it's the most beautiful, and beautiful-smelling, plant in the garden.
        </p> 
        
        <p>
            <div class="subtitle">
                It's a hardy grower.
            </div>
        Wisteria can withstand the surprise frosts that threaten other plants in the garden. 
        It's also resistant to garden pests, like deer. 
        Wisteria is drought tolerant, and it handily stands up to inclement weather. 
        (Just be sure to prune this hardy vine—it's a rambler.)
        </p> 
        </div>
    
        
    </div>
    `
});
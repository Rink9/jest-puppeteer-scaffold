// Custom functions

// if you want to delay after/before on element use this: await delay(time) 
export async function delay( time ) {
    return new Promise( function( resolve ) { 
        setTimeout( resolve, time )
    });
}

// if you want to scroll down use this: scrollToBottom()
export function scrollToBottom() {
    page.evaluate( _ => {
        window.scrollBy( 0, window.innerHeight );
    });
}

// if you want to click particular element for n times use this: await timesClick(element, count) 
export async function timesClick( element, count ) {
    for ( let step = 0; step < count; step++ ) {
        await page.click( element );
    }

}
// if you want to assert particular element use this: await isElementExist(element) 
export async function isElementExist( element ){
    if (await page.$(element) !== null) {
       return true;
    }
    return false;
}

// if you want to drag and drop use this: await findElementPosition( element ) 
export async function findElementPosition( element ) {
   await page.evaluate( _ => {
        const xPos = document.querySelector( element ).getBoundingClientRect().left;
        const yPos = document.querySelector( element ).getBoundingClientRect().top;
        return {
            xPos,yPos
        } 
    });
}

// if you want to attach media files this: await findElementPosition( fileInput, [files] ) 
export async function attachFiles( fileInput, files ) {
    await page.waitForSelector( fileInput, { visible: true } );
    let input = await page.$( fileInput );
    await input.uploadFile( ...files );
    await input.evaluate(upload => upload.dispatchEvent(new Event('change', { bubbles: true })));
    await page.waitFor(5000);
} 
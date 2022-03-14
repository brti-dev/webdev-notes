/*************/
/** @WEBAPIs */
/*************/

/**
 * @HTMLImageElement
 * 
 * @instanceof HTMLElement
 * 
 * The HTMLImageElement interface represents an HTML <img> element, providing the properties and methods used to manipulate image elements.
 */

// Constructor
new Image()

HTMLImageElement.alt: DOMString //reflects the alt HTML attribute, thus indicating the alternate fallback content to be displayed if the image has not been loaded.
HTMLImageElement.complete: boolean //true if the browser has finished fetching the image, whether successful or not. That means this value is also true if the image has no src value indicating an image to load.
HTMLImageElement.crossOrigin: DOMString //specifying the CORS setting for this image element. See CORS settings attributes for further details. This may be null if CORS is not used.
HTMLImageElement.currentSrc: USVString //representing the URL from which the currently displayed image was loaded. This may change as the image is adjusted due to changing conditions, as directed by any media queries which are in place.
HTMLImageElement.decoding //An optional DOMString representing a hint given to the browser on how it should decode the image. If this value is provided, it must be one of the possible permitted values: sync to decode the image synchronously, async to decode it asynchronously, or auto to indicate no preference (which is the default). Read the decoding page for details on the implications of this property's values.
HTMLImageElement.height: number //height HTML attribute, indicating the rendered height of the image in CSS pixels.
HTMLImageElement.isMap //A Boolean that reflects the ismap HTML attribute, indicating that the image is part of a server-side image map. This is different from a client-side image map, specified using an <img> element and a corresponding <map> which contains <area> elements indicating the clickable areas in the image. The image must be contained within an <a> element; see the ismap page for details.
HTMLImageElement.loading //A DOMString providing a hint to the browser used to optimize loading the document by determining whether to load the image immediately (eager) or on an as-needed basis (lazy).
HTMLImageElement.naturalHeight: number //intrinsic height of the image in CSS pixels, if it is available; else, it shows 0. This is the height the image would be if it were rendered at its natural full size.
HTMLImageElement.naturalWidth: number //intrinsic width of the image in CSS pixels, if it is available; otherwise, it will show 0. This is the width the image would be if it were rendered at its natural full size.
HTMLImageElement.referrerPolicy //A DOMString that reflects the referrerpolicy HTML attribute, which tells the user agent how to decide which referrer to use in order to fetch the image. Read this article for details on the possible values of this string.
HTMLImageElement.sizes //A DOMString reflecting the sizes HTML attribute. This string specifies a list of comma-separated conditional sizes for the image; that is, for a given viewport size, a particular image size is to be used. Read the documentation on the sizes page for details on the format of this string.
HTMLImageElement.src //A USVString that reflects the src HTML attribute, which contains the full URL of the image including base URI. You can load a different image into the element by changing the URL in the src attribute.
HTMLImageElement.srcset //A USVString reflecting the srcset HTML attribute. This specifies a list of candidate images, separated by commas (',', U+002C COMMA). Each candidate image is a URL followed by a space, followed by a specially-formatted string indicating the size of the image. The size may be specified either the width or a size multiple. Read the srcset page for specifics on the format of the size substring.
HTMLImageElement.useMap //A DOMString reflecting the usemap HTML attribute, containing the page-local URL of the <map> element describing the image map to use. The page-local URL is a pound (hash) symbol (#) followed by the ID of the <map> element, such as #my-map-element. The <map> in turn contains <area> elements indicating the clickable areas in the image.
HTMLImageElement.width: number //width HTML attribute, indicating the rendered width of the image in CSS pixels.
HTMLImageElement.x: number //horizontal offset of the left border edge of the image's CSS layout box relative to the origin of the <html> element's containing block.
HTMLImageElement.y: number //vertical offset of the top border edge of the image's CSS layout box relative to the origin of the <html> element's containing block.

/** @Storage **/
/**
sessionStorage maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open, including page reloads and restores)
Stores data only for a session, meaning that the data is stored until the browser(or tab) is closed.
Data is never transferred to the server.
Storage limit is larger than a cookie(at most 5MB).

localStorage does the same thing, but persists even when the browser is closed and reopened.
Stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser cache / Locally Stored Data.
Storage limit is the maximum amongst the three.
**/

// Properties
Storage.length // Read only. Returns an integer representing the number of data items stored in the Storage object.

// Methods
Storage.key(n) // When passed a number n, this method will return the name of the nth key in the storage.
Storage.getItem(key): DOMstring | null // When passed a key name, will return that key's value.
Storage.setItem(key, value) // When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
Storage.removeItem(key) // When passed a key name, will remove that key from the storage.
Storage.clear() // When invoked, will empty all keys out of the storage.

/** @URL */

// Constructor
new URL() // Creates and returns a URL object referencing the URL specified using an absolute URL string, or a relative URL string and a base URL string.

// Properties
URL.hash() // A USVString containing a '#' followed by the fragment identifier of the URL.
URL.host() // A USVString containing the domain (that is the hostname) followed by (if a port was specified) a ':' and the port of the URL.
URL.hostname() // A USVString containing the domain of the URL.
URL.href() // A stringifier that returns a USVString containing the whole URL.
URL.origin() // Read only; Returns a USVString containing the origin of the URL, that is its scheme, its domain and its port.
URL.password() // A USVString containing the password specified before the domain name.
URL.pathname() // Is a USVString containing an initial '/' followed by the path of the URL, not including the query string or fragment.
URL.port() // A USVString containing the port number of the URL.
URL.protocol() // A USVString containing the protocol scheme of the URL, including the final ':'.
URL.search() // A USVString indicating the URL's parameter string; if any parameters are provided, this string includes all of them, beginning with the leading ? character.
URL.searchParams() // Read only; A @URLSearchParams object which can be used to access the individual query parameters found in search.
URL.username() // A USVString containing the username specified before the domain name.

// Methods
toString() // Returns a USVString containing the whole URL. It is a synonym for URL.href, though it can't be used to modify the value.
toJSON() // Returns a USVString containing the whole URL. It returns the same string as the href property.

/** @URLSearchParams */

// Constructor
new URLSearchParams() // Returns a URLSearchParams object instance.

// Methods
URLSearchParams.append() // Appends a specified key/value pair as a new search parameter.
URLSearchParams.delete() // Deletes the given search parameter, and its associated value, from the list of all search parameters.
URLSearchParams.entries() // Returns an iterator allowing iteration through all key/value pairs contained in this object.
URLSearchParams.forEach() // Allows iteration through all values contained in this object via a callback function.
URLSearchParams.get() // Returns the first value associated with the given search parameter.
URLSearchParams.getAll() // Returns all the values associated with a given search parameter.
URLSearchParams.has() // Returns a Boolean indicating if such a given parameter exists.
URLSearchParams.keys() // Returns an iterator allowing iteration through all keys of the key/value pairs contained in this object.
URLSearchParams.set() // Sets the value associated with a given search parameter to the given value. If there are several values, the others are deleted.
URLSearchParams.sort() // Sorts all key/value pairs, if any, by their keys.
URLSearchParams.toString() // Returns a string containing a query string suitable for use in a URL.
URLSearchParams.values() // Returns an iterator allowing iteration through all values of the key/value pairs contained in this object.

/** @FormData */

FormData() // Constructor; Creates a new FormData object.
FormData.append() // Appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
FormData.delete() // Deletes a key/value pair from a FormData object.
FormData.entries() // Returns an iterator allowing to go through all key/value pairs contained in this object.
FormData.get() // Returns the first value associated with a given key from within a FormData object.
FormData.getAll() // Returns an array of all the values associated with a given key from within a FormData.
FormData.has() // Returns a boolean stating whether a FormData object contains a certain key.
FormData.keys() // Returns an iterator allowing to go through all keys of the key/value pairs contained in this object.
FormData.set() // Sets a new value for an existing key inside a FormData object, or adds the key/value if it does not already exist.
FormData.values() // Returns an iterator allowing to go through all values  contained in this object.

// Using fetch API with FormData
const formData = new FormData()
formData.append('file', image)
formData.append('signature', signature)
formData.append('timestamp', timestamp.toString())
formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '')
const response = await fetch(CLOUDINARY_API_ENDPOINT, {
method: 'POST',
body: formData,
})
return response.json()

// Get FormData from a form element
var formElement = document.querySelector("form");
var formData = new FormData(formElement);
var request = new XMLHttpRequest();
request.open("POST", "submitform.php");
formData.append("serialnumber", serialNumber++);
request.send(formData);

/** 
 * @FileReader
 * 
 * asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
 */

// Example Typescript React component that handles file upload
<input
    type="file"
    accept="image/*"
    className="visually-hidden"
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files?.[0]) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                console.log('Upload src', reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }}
/>
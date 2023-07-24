const signup = ()=>{
    document.querySelector('#container').style.display = 'none';
    document.querySelector('#signup').style.display = 'block';
    document.querySelector('#login').style.display = 'none';
};

const login = ()=>{
    document.querySelector('#container').style.display = 'none';
    // document.querySelector('body').style.backgroundColor= '#54483A';
    document.querySelector('#signup').style.display = 'none';
    document.querySelector('#login').style.display = 'block';
};

const home = ()=>{

    setTimeout(() => {
        document.location.reload();
      }, 1);

    document.querySelector('#container').style.display = 'block';
    document.querySelector('#signup').style.display = 'none';
    document.querySelector('#login').style.display = 'none';
};
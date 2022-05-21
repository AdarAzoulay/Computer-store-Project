import Swal from "sweetalert2";

export const getLocal = (value) => { //using at DescriptionPage
  switch (value) {
    case "All":
      localStorage.setItem("active", 0);
      break;
    case "Lenovo":
      localStorage.setItem("active", 1);
      break;
    case "HP":
      localStorage.setItem("active", 2);
      break;
    case "Dell":
      localStorage.setItem("active", 3);
      break;
    case "Apple":
      localStorage.setItem("active", 4);
      break;
      case "Acer":
        localStorage.setItem("active", 5);
        break;
    default:
      return 0;
  }
};


export const addToCart = (user,ComputerModel, setUserCart, userID) => { //using at DescriptionPage and ComputerCard
  const id = ComputerModel.id;
  const index = user.cart.findIndex(
    (title) => title.item === ComputerModel.title
  );
  if (index === -1) {
    const newCart = [
      ...user.cart,
      {
        item: ComputerModel.title,
        amount: 1,
        price: parseInt(ComputerModel.price),
        img: ComputerModel.imgpath,
        id: id
      },
    ];
    setUserCart(newCart);
    fetch("http://localhost:8001/users/" + userID, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        cart: newCart,
      }),
    });
    Swal.fire({
      icon: "success",
      title: "ITEM ADDED TO CART",
      text: "Follow to cart to see your items..",
      // footer: '<button ></button>',
    });
  } else {
    if (user.cart[index].amount < 4) {
      let titleIndex = user.cart.findIndex(
        (title) => title.item === ComputerModel.title
      );
      const newCart = [
        ...user.cart.slice(0, titleIndex),
        {
          ...user.cart[titleIndex],
          amount: user.cart[titleIndex].amount + 1,
        },
        ...user.cart.slice(titleIndex + 1, user.cart.length),
      ];
      setUserCart(newCart);

      fetch("http://localhost:8001/users/" + userID, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          cart: newCart,
        }),
      });
      Swal.fire({
        icon: "success",
        title: "ITEM ADDED TO CART",
        text: "Follow to cart to see your items..",
        // footer: '<button >Cart</button>',
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Cannot add more than 4 computers from the same model to cart",
      });
    }
  }
};

export const handleDelete = (id, computerModels , setComputerModels ) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("http://localhost:8000/computerModels/" + id, {
        method: "DELETE",
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      const newComputerModels = computerModels.filter(
        (computer) => computer.id !== id
      );
      setComputerModels(newComputerModels);
    }
  });
};

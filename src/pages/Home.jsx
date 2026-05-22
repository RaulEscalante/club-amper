import { Link, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { obtenerProductos } from "../services/productosService";

import 'swiper/css';
import 'swiper/css/navigation';

function Home() {
    const API_URL = "http://localhost/club-amper-api/backend";
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [productos, setProductos] = useState([]);
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const response = await obtenerProductos();
        if (response && response.success) {
            setProductos(response.data);
        }
    };

    const beneficios = [
        {
            id: 1,
            icon: "/assets/clinicaMad.jpeg",
            text: "Descuento de 10% en Clínica Mad"
        },
        {
            id: 2,
            icon: "/assets/clinicaSanPedro.jpeg",
            text: "Descuento de 10% en Clínica San Pedro"
        },
        {
            id: 3,
            icon: "/assets/elromano.jpeg",
            text: "Descuento de 10% en Restaurant-Pizzeria El Romano"
        },
        {
            id: 4,
            icon: "/assets/miuraCamp.jpg",
            text: "Descuento de 15% en Restaurant Campestre Miura Camp"
        },
        {
            id: 5,
            icon: "/assets/puntos.png",
            text: "Acumulación de puntos"
        },
        {
            id: 6,
            icon: "/assets/envio.png",
            text: "Despacho prioritario"
        },
        {
            id: 7,
            icon: "/assets/descuento.png",
            text: "Promociones exclusivas"
        },
        {
            id: 8,
            icon: "/assets/tarjeta.png",
            text: "Tarjeta digital"
        },
        {
            id: 9,
            icon: "/assets/capacitacion.png",
            text: "Capacitaciones técnicas"
        }
    ];
    return (
        <MainLayout>
            {/* HERO */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container hero-container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 hero-left">
                            <span className="hero-badge">
                                CLUB DE BENEFICIOS AMPER
                            </span>
                            <h1 className="hero-title">
                                Convierte tus compras en
                                <span> premios increíbles</span>
                            </h1>
                            <p className="hero-description">
                                Acumula puntos con cada compra realizada en Amper
                                y canjéalos por productos exclusivos, promociones
                                y beneficios especiales.
                            </p>
                            <div className="hero-buttons">
                                {!usuario && (
                                    <Link
                                        className="btn-hero-primary"
                                        to="/login/Registrar"
                                    >
                                        Empezar ahora
                                    </Link>
                                )}
                                <a href="https://ampercompany.com.pe/" target="_blank" rel="noopener noreferrer"
                                    className="btn-hero-secondary">Ver catálogo</a>
                            </div>

                        </div>

                        <div className="col-lg-6 hero-right">
                            <div className="hero-image-card">
                                <img src="/assets/amper_promocion.jpg" alt="Amper" className="hero-banner" />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* CÓMO FUNCIONA */}
            <section className="container py-3">
                <h2 className="text-center mb-5">
                    ¿Cómo participo?
                </h2>

                <div className="row campospas">

                    <div className="col-md-3 text-center pasos">
                        <img src="assets/comprar.png" alt="Pagar" />
                        <h3>1</h3>
                        <p>Compra nuestros productos desde nuestra web</p>
                    </div>

                    <div className="col-md-3 text-center pasos">
                        <img src="assets/acumular.png" alt="Acumular" />
                        <h3>2</h3>
                        <p>Acumularas puntos con cada compra</p>
                    </div>

                    <div className="col-md-3 text-center pasos">
                        <img src="assets/canjear.png" alt="Canjear" />
                        <h3>3</h3>
                        <p>Y podras canjear premios</p>
                    </div>

                </div>
            </section>

            {/* BENEFICIOS */}
            <section className="container py-5">
                <h2 className="text-center fw-bold mb-5">
                    Beneficios
                </h2>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    loop={true}
                    slidesPerView={4}
                    slidesPerGroup={1}
                    spaceBetween={25}
                >
                    {beneficios.map(item => (
                        <SwiperSlide key={item.id}>
                            <div className="beneficio-card">
                                <img src={item.icon} alt="" className='icon-ben' />

                                <p className="textop">
                                    {item.text}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            {/* CATÁLOGO */}
            <section className="container py-5">
                <h2 className="text-center fw-bold mb-5">
                    Premios disponibles
                </h2>

                <div className="row justify-content-center">

                    {productos.slice(0, 4).map(item => (
                        <div className="col-md-4 col-lg-3 mb-4" key={item.id}>

                            <div className="producto-card">

                                <div className="producto-img-container">
                                    <img
                                        src={item.imagen ? `${API_URL}/uploads/productos/${item.imagen}` : "/assets/no-image.png"}
                                        alt={item.nombre}
                                        className="producto-img"
                                    />
                                </div>

                                <div className="producto-info text-center">

                                    <h5 className="producto-nombre">
                                        {item.nombre}
                                    </h5>

                                    <p className="producto-marca">
                                        {item.marca}
                                    </p>

                                    <div className="producto-puntos">
                                        {item.puntos_requeridos} puntos
                                    </div>

                                    <button
                                        className="btn btn-canjear"
                                        onClick={() => {
                                            if (!usuario) {
                                                alert("Debes iniciar sesión para canjear productos");
                                                return;
                                            }

                                            alert("Canje exitoso");
                                        }}
                                    >
                                        Canjear Ahora
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}
                    <Link className="btn-ver-mas" to="/productos">Ver más</Link>
                </div>

            </section>

            {!usuario && (

                <section className="cta-section">

                    <div className="container text-center">

                        <h2>
                            Empieza a acumular puntos hoy
                        </h2>

                        <p>
                            Forma parte del Club Amper y accede a beneficios exclusivos.
                        </p>

                        <Link
                            to="/login/Registrar"
                            className="cta-button"
                        >
                            Crear cuenta
                        </Link>

                    </div>

                </section>

            )}
        </MainLayout>
    )
}

export default Home
import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "phosphor-react";
import "./FlyPage.css";
import Loader from "../util/Loader/Loader";
import FavoriteIcon from "../components/FavoriteIcon/FavoriteIcon";
import Tag from "../components/Tag/Tag";

const FlyPage = () => {
	const [fly, setFly] = useState(null);
	const [favorite, setFavorite] = useState(false);
	const [isDeletePrompt, setIsDeletePrompt] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();

	const { id } = useParams();
	const { user } = useContext(UserContext);

	useEffect(() => {
		const getFly = async () => {
			const res = await fetch(process.env.REACT_APP_API_URL + "/flies/" + id, {
				credentials: "include",
			});
			const data = await res.json();
			console.log(data);
			setFly(data);
			if (data.is_favorite === true) setFavorite(true);
		};
		getFly();
	}, []);

	const deleteFly = async () => {
		setIsDeleting(true);
		const res = await fetch(process.env.REACT_APP_API_URL + "/flies/" + id, {
			credentials: "include",
			method: "delete",
		});
		const data = await res.json();
		setIsDeleting(false);
		console.log(data);
		navigate("/flies");
	};

	const deleteQuestionOverlay = () => {
		return (
			<div
				className="overlay"
				onClick={() => setIsDeletePrompt(false)}
				style={{ textAlign: "center" }}
			>
				<div
					className="rounded-box"
					onClick={(e) => {
						e.stopPropagation();
					}}
					style={{ width: "200px", boxShadow: "var(--box-shadow-standard)" }}
				>
					{!isDeleting ? (
						<>
							<h3 style={{ margin: "0 0 .75em 0" }}>
								Are you sure you want to delete?
							</h3>
							<br />
							<button className="btn btn-delete text-large" onClick={deleteFly}>
								Delete
							</button>
						</>
					) : (
						<Loader />
					)}
				</div>
			</div>
		);
	};

	return (
		<section className="center-box rounded-box" style={{ color: "white" }}>
			{isDeletePrompt ? deleteQuestionOverlay() : null}
			{fly ? (
				<div>
					<img className="title-image" src={fly.image_url} alt="Fly Pic" />
					<div className="top-bar">
						<div className="tagBox" style={{ flexWrap: "nowrap" }}>
							{fly.tag_list &&
								fly.tag_list
									.split(",")
									.map((tag, index) => (
										<Tag text={tag} key={index} interactable={false} />
									))}
						</div>
						<div className="iconBox">
							{fly.user_id === user?.id && (
								<Trash className='grow-icon' size={24} weight="regular" onClick={() => setIsDeletePrompt(true)}/>
							)}
							{fly.user_id === user?.id && (
								<Pencil className='grow-icon' size={24} weight="regular" />
							)}
							<FavoriteIcon
								isFavorite={favorite}
								setFavorite={setFavorite}
								fly_id={fly.id}
							/>
						</div>
					</div>
                    <hr style={{color: 'var(--secondary-font-color)'}}/>
					<h2 className="title">{fly.name}</h2>
					<h4 className="tagline">
						{fly.tagline ? fly.tagline : "The fly that started it all"}
					</h4>

					<p className="description">{fly.description}</p>
				</div>
			) : (
				<Loader />
			)}
		</section>
	);
};

export default FlyPage;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

export const useOrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getOrder } = useOrders();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (err) {
        setError("Unable to retrieve technical confirmation.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id, getOrder]);

  return { order, loading, error, navigate };
};



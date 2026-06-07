import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/FlowchartStatusServlet")
public class FlowchartStatusServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;

        if (userId == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\":false,\"message\":\"Not logged in\"}");
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            String sql = "SELECT course_code, course_status FROM flowchart_status WHERE user_id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, userId);

            ResultSet rs = pstmt.executeQuery();

            StringBuilder json = new StringBuilder();
            json.append("{\"success\":true,\"statuses\":{");

            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("\"")
                    .append(escapeJson(rs.getString("course_code")))
                    .append("\":\"")
                    .append(escapeJson(rs.getString("course_status")))
                    .append("\"");
                first = false;
            }

            json.append("}}");
            out.print(json.toString());

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"success\":false,\"message\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        String userId = (session != null) ? (String) session.getAttribute("userId") : null;

        if (userId == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\":false,\"message\":\"Not logged in\"}");
            return;
        }

        String courseCode = request.getParameter("courseCode");
        String courseStatus = request.getParameter("courseStatus");

        if (courseCode == null || courseCode.trim().isEmpty() ||
            courseStatus == null || courseStatus.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"success\":false,\"message\":\"Missing courseCode or courseStatus\"}");
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            String sql = """
                INSERT INTO flowchart_status (user_id, course_code, course_status)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE course_status = VALUES(course_status)
            """;

            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, userId);
            pstmt.setString(2, courseCode);
            pstmt.setString(3, courseStatus);
            pstmt.executeUpdate();

            out.print("{\"success\":true}");

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"success\":false,\"message\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}